const { Photo, Serie, SerieTranslation, Sequelize, PhotoTranslation, Language, User } = require('./models');
require("dotenv").config();

const express = require('express');
const cors = require('cors');
const authJwt = require('./middleware/authJwt');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Op } = require("sequelize");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use('/medias', express.static(__dirname + '/medias'));
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './medias')
    },
    filename: function (req, file, cb) {
        var getFileExt = function(fileName){
            var fileExt = fileName.split(".");
            if( fileExt.length === 1 || ( fileExt[0] === "" && fileExt.length === 2 ) ) {
                return "";
            }
            return fileExt.pop();
        }
        cb(null, Date.now() + '.' + getFileExt(file.originalname))
    }
})
const multerUpload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
    limits:{
        fileSize: 4000 * 4000
    }
})

  
image: {
    type: Buffer
}

app.get('/api/getSeries/:language', async(req, res) => {
  try{
    const series = await Serie.findAll({
      attributes: ['id', 'main_photo_file', [Sequelize.col('SerieTranslations.title'), "title"], [Sequelize.col('SerieTranslations.description'), "description"]],
      include: [{
        attributes: [],
        model: SerieTranslation,
        where: {
          LanguageISO: req.params.language
        }
        },
        {
          attributes: ['fileName', [Sequelize.literal('`Photos->PhotoTranslations`.`title`'), "title"], [Sequelize.literal('`Photos->PhotoTranslations`.`description`'), "description"]],
          model: Photo,
          include: [{
            attributes: [],
            model: PhotoTranslation,
            where: {
              LanguageISO: req.params.language
            }
          }]
        }
      ]
    })
    return res.json(series);
  } catch(err) {
    console.log(err)
    return res.status(500).json(err)
  }
})


app.get('/api/getAllSeriesData/', async(req, res) => {
  try{
    const series = await Serie.findAll({
      attributes: ['id', 'main_photo_file'],
      include: [{
        model: SerieTranslation,
        attributes: ['LanguageISO', 'title', 'description'],
        },
        {
          attributes: ['id', 'fileName'],
          model: Photo,
          include: [{
            model: PhotoTranslation,
            attributes: ['LanguageISO', 'title', 'description'],
          }]
        }
      ]
    })
    return res.json(series);
  } catch(err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.get('/api/getSerie/:serieId/:language', async(req, res) => {
  try{
    const serie = await Serie.findAll({
      attributes: ['id', 'main_photo_file', [Sequelize.col('SerieTranslations.title'), "title"], [Sequelize.col('SerieTranslations.description'), "description"]],
      where: {
        id: req.params.serieId,
      },
      include: [{
        attributes: [],
        model: SerieTranslation,
        where: {
          LanguageISO: req.params.language
        }
        },
        {
          attributes: ['id', 'fileName', [Sequelize.literal('`Photos->PhotoTranslations`.`title`'), "title"], [Sequelize.literal('`Photos->PhotoTranslations`.`description`'), "description"]],
          model: Photo,
          include: [{
            attributes: [],
            model: PhotoTranslation,
            where: {
              LanguageISO: req.params.language
            }
          }]
        }
      ]
    })
    return res.json(serie[0]);
  } catch(err) {
    console.log(err)
    return res.status(500).json(err)
  }
})


app.get('/api/getLanguages', async(req, res) => {
  try{
    const languages = await Language.findAll({
      attributes: ['LanguageISO', 'name']
    })
    return res.json(languages);
  } catch(err) {
    console.log(err)
    return res.status(500).json(err)
  }
})


app.post('/api/uploadPhoto', multerUpload.single('upload'), async (req, res) => {
    try {
        res.send({"filename": req.file.filename})
    } catch (e){
        res.status(400).send(e)
    }
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

app.post('/api/updateOrCreateSerie', [authJwt.verifyToken], async(req, res) => {
  try{
    const serie = req.body;
    await Photo.destroy({
        where: { 
            SerieId: serie.id,
            id: {[Op.notIn]: serie.Photos.map(x => x.id)}
        }
    });
    let createdSerie;
    const serieDB = await Serie.findOne({
        where: {id: serie.id}
    })
    if(serieDB){
        serieDB.main_photo_file = serie.main_photo_file;
        await serieDB.save();
    } else {
        createdSerie = await Serie.create({
            main_photo_file: serie.main_photo_file
        })
        serie.id = createdSerie.id;
    }
    serie.SerieTranslations.forEach(async serieTranslation => {
        const translation = await SerieTranslation.findOne({
            where: {
                SerieId: serie.id,
                LanguageISO: serieTranslation.LanguageISO
            }
        })
        if(translation){
            translation.title = serieTranslation.title;
            translation.description = serieTranslation.description;
            await translation.save();
        } else {
            await SerieTranslation.create({
                SerieId: serie.id,
                LanguageISO: serieTranslation.LanguageISO,
                title: serieTranslation.title,
                description: serieTranslation.description
            })
        }
    });

    serie.Photos.forEach(async photo => {
        let createdPhoto;
        if (photo.fileName) {
            const photoDB = await Photo.findOne({
                where: {id: photo.id}
            })
            if(photoDB){
                photoDB.fileName = photo.fileName;
                await photoDB.save();
            } else {
                createdPhoto = await Photo.create({
                    SerieId: serie.id || createdSerie.id,
                    fileName: photo.fileName
                });
                photo.id = createdPhoto.id;
            }

            photo.PhotoTranslations.forEach(async photoTranslation => {
                const translation = await PhotoTranslation.findOne({
                    where: {
                        PhotoId: photo.id || createdPhoto.id,
                        LanguageISO: photoTranslation.LanguageISO
                    }
                })
                if(translation){
                    translation.title = photoTranslation.title;
                    translation.description = photoTranslation.description;
                    await translation.save();
                } else {
                    await PhotoTranslation.create({
                        PhotoId: photo.id || createdPhoto.id,
                        LanguageISO: photoTranslation.LanguageISO,
                        title: photoTranslation.title,
                        description: photoTranslation.description
                    })
                }
            })
        }
    });
    console.log('HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    console.log('HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    console.log('HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    console.log('HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    console.log('HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    console.log('HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    console.log('HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    console.log('HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    console.log('HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    console.log('HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    return res.json(serie);
  } catch(err) {
    console.log(err)
    return res.status(500).json(err)
  }
})


app.post('/api/deleteSerie', [authJwt.verifyToken], async(req, res) => {
  try{
    await Serie.destroy({
      where: {
        id: req.body.id
      }
    })
    return res.json({mesage: "La série a été supprimé"});
  } catch(err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.post('/api/login/', async(req, res) => {
    try{
        let username = req.body.username;
        let password = req.body.password;

        const user = await User.findOne({
            where: {
                username,
            }
        })
        if (user && bcrypt.compare(password, user.password)) {
          const token = jwt.sign(
            { username, password },
            process.env.JWT_KEY,
            {
              expiresIn: "2h",
            }
          );
          user.token = token;
          res.status(201).json(token);
        } else {
            return res.status(401).json({message: 'Wrong association of username and password'})
        }
    } catch(err) {
        console.log(err);
        return res.status(500).json(err)
    }
})



app.listen(8000, async () => {
  console.log("App is listening on port localhost:8000");
})