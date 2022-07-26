const { sequelize, Photo, Serie, SerieTranslation, Sequelize, PhotoTranslation } = require('./models');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use('/medias', express.static(__dirname + '/medias'));

app.get('/api/getSeries/:language', async(req, res) => {
  try{
    const series = await Serie.findAll({
      attributes: ['id', 'main_photo_file', [Sequelize.col('SerieTranslations.title'), "title"], [Sequelize.col('SerieTranslations.description'), "description"]],
      include: [{
        attributes: [],
        model: SerieTranslation,
        where: {
          language_iso: req.params.language
        }
        },
        {
          attributes: ['fileName', [Sequelize.literal('`Photos->PhotoTranslations`.`title`'), "title"], [Sequelize.literal('`Photos->PhotoTranslations`.`description`'), "description"]],
          model: Photo,
          include: [{
            attributes: [],
            model: PhotoTranslation,
            where: {
              language_iso: req.params.language
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

app.get('/api/getSeries/:serieId/:language', async(req, res) => {
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
          language_iso: req.params.language
        }
        },
        {
          attributes: ['fileName', [Sequelize.literal('`Photos->PhotoTranslations`.`title`'), "title"], [Sequelize.literal('`Photos->PhotoTranslations`.`description`'), "description"]],
          model: Photo,
          include: [{
            attributes: [],
            model: PhotoTranslation,
            where: {
              language_iso: req.params.language
            }
          }]
        }
      ]
    })
    return res.json(serie);
  } catch(err) {
    console.log(err)
    return res.status(500).json(err)
  }
})


app.listen(8000, () => {
  console.log("App is listening on port localhost:8000")
})