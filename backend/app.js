const { sequelize, Photo, Serie, SerieTranslation, Sequelize } = require('./models');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use('/medias', express.static(__dirname + '/medias'));

app.get('/api/getSeries', async(req, res) => {
  try{
    const photo = await Serie.findAll({
      attributes: ['id', 'main_photo_file', Sequelize.literal('SerieTranslation.title', "title"), Sequelize.literal('SerieTranslation.description', "description")],
      include: [{
        attributes: [],
        model: SerieTranslation,
        },
        {
          attributes: [],
          model: Photo
        }
      ]
    })
    return res.json(photo);
  } catch(err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.listen(8000, () => {
  console.log("App is listening on port localhost:8000")
})