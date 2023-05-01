const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const screenSchema = new mongoose.Schema({
  screenname: {
    type: String,
    required: true
  },
  totalcount: {
    type: Number,
    required: true
  },
  row: {
    type: Number,
    required: true
  },
  column: {
    type: Number,
    required: true
  },
  screentype: {
    type: String,
    required: true
  }
});

const theaterOwnerSchema = new mongoose.Schema({
  name: {
    type: String,
    require:true
  },
  email: {
    type: String,
    require: [true, ' Email is require'],
    unique: true,
  },
  password: {
    type: String,
    require: [true, ' Password is require'],
  },
  place: {
    type: String,
    require: [true, ' Place is require'],
  },
  accepted: {
    type: Boolean,
  },
  screens:[screenSchema]
})

theaterOwnerSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
})

module.exports = mongoose.model('theaters', theaterOwnerSchema)
