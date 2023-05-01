const mongoose = require("mongoose")

const languageSchema = new mongoose.Schema({
   language:{
      type:String,
      required:true
   }
})

module.exports = mongoose.model("Languages",languageSchema)