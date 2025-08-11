// server/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {type: String,required: true,unique: true,lowercase: true,trim: true,},
  username: {type: String,trim: true,default: "",},
  password: {type: String,required: true,},
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
