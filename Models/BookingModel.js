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
  trailerlink: {
    type: String,
    require: true,
  },
})

const ScreenSchema = new mongoose.Schema({
  screenname: {
    type: String,
    require: true,
  },

  screentype: {
    type: String,
    require: true,
  },
  acnon: {
    type: String,
    require: true,
  },
  rowcount: {
    type: String,
    require: true,
  },
  columncount: {
    type: String,
    require: true,
  },
  totalcount: {
    type: String,
    require: true,
  },
})

const bookingSchema = new mongoose.Schema({
  BookingDate: { type: Date, required: true },
  CompletPayment: { type: Boolean, required: true },
  user: {
    email: { type: String, required: true },
  },
  show: {
    date: { type: Date, required: true },
    time: { type: String, required: true },
    SeatNumber: [String],
    price: { type: Number, required: true },
    TotelPrice: { type: Number, required: true },
  },
  movie: MovieSchema,
  theater: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    screen: ScreenSchema,
  },
})

module.exports = mongoose.model('Booking', bookingSchema)
