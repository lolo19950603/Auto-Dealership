var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    personalAds: [{type: Schema.Types.ObjectId, ref: 'Ad'}],
    favList: [{type: Schema.Types.ObjectId, ref: 'Ad'}],
    googleId: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
