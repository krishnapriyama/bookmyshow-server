const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
  moviename: {
    type: String,
    require: [true, 'movie name is require'],
  },

  releasedate: {
    type: Date,
    require: [true, 'Relese date is require'],
  },
  description: {
    type: String,
    require: true,
  },
  poster1: {
    type: String,
    require: true,
  },
  poster2: {
    type: String,
    require: true,
  },
  poster3: {
    type: String,
    require: true,
  },
  genre: {
    type: String,
    require: true,
  },
  language: {
    type: String,
    require: true,
  },
  rating: {
    type: Number
  },
  trailerlink: {
    type: String,
    require: true,
  },
})

module.exports = mongoose.model('movies', MovieSchema)
