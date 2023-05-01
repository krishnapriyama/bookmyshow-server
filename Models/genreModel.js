const mongoose = require("mongoose")

const genreSchema = new mongoose.Schema({
   genre:{
      type:String,
      required:true
   }
})

module.exports = mongoose.model("Genres",genreSchema)