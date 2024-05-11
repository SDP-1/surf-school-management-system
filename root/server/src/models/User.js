const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

  fullName: {
    type: String,
    required: true,
  },
  userName: {
    type: String, 
    requied: true,
  },
  password: {
    type: String, 
    requied: true,
  },
  NIC: {
    type: String,
    requied: true,
  },
  status: {
    type: String,
    requied: true,
    default: "Ref",  //Adm - admin , Rec - recipshanist
  },
  image: {
    type: String,
  },
});


module.exports = mongoose.model("User", postSchema);
