const mongoose = require("mongoose");
// const MovieModel = require('./MovieModel');

const MovieSchema = new mongoose.Schema({
  moviename:{
      type:String,
      require:[true,"movie name is require"]
  },

  releasedate:{
      type:Date,
      require:[true,"Relese date is require"]
  },
  description: {
      type:String,
      require:true
  },
  poster1: {
      type:String,
      require:true
  },
  poster2: {
      type:String,
      require:true
  },
  poster3: {
      type:String,
      require:true
  },
  genre:{
      type:String,
      require:true
  },
  language:{
      type:String,
      require:true
  },
  trailerlink:{
      type:String,
      require:true
  }
})

const screenSchema = new mongoose.Schema({
   screenname: {
    type: String,
    required: true,
  },
  totalcount: {
    type: Number,
    required: true,
  },
  row: {
    type: Number,
    required: true,
  },
  column: {
    type: Number,
    required: true,
  },
  screentype: {
    type: String,
    required: true,
  }
});

const ShowSchema = new mongoose.Schema({
    startDate: {
      type: Date,
      required: true,
    },
    EndDate: {
      type: Date,
      required: true,
    },
    ShowTimes: {
      type:[ String],
      required: true,
    },
    TicketPrice: {
      type: Number,
      required: true,
    },
    Movie:MovieSchema,
    theater: {
      name: String ,
      email:String,
      address: String,
      screen:screenSchema,
   }
   
  });

  module.exports = mongoose.model('shows',ShowSchema)