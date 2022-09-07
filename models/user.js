var mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Ad = require("../models/ad");

var userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    googleId: String
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
