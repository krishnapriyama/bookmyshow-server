const mongoose = require("mongoose");

const ScreenSchema = new mongoose.Schema({
   screenname:{
        type:String,
        require:true
    },

    screentype:{
        type:String,
        require:true
    },
    acnon: {
        type:String,
        require:true
    },
    rowcount: {
        type:String,
        require:true
    },
    columncount: {
        type:String,
        require:true
    },
    totalcount: {
        type:String,
        require:true
    }
})

module.exports = mongoose.model("screens", ScreenSchema);
  
  
  