var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new mongoose.Schema(
  {
    year: Number,
    make: String,
    model: String,
    ads: [{type: Schema.Types.ObjectId, ref: 'Ad'}]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Car", userSchema);