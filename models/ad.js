var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var adSchema = new mongoose.Schema(
  {
    title: String,
    pictures: Array,
    description: String,
    car: {type: Schema.Types.ObjectId, ref: 'Car'},
    milege: { type: Number, min: 0},
    vin: String
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ad", userSchema);