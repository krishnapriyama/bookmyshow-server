const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    require: [true, " Email is required"],
    unique: true,
    
  },
  password: {
    type: String,
    require: [true, " Password is require"],
  }

});


module.exports = mongoose.model("admins", adminSchema);

