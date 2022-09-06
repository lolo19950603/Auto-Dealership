var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var adSchema = new mongoose.Schema(
  {
    title: String,
    year: { type: Number, min: 0},
    make: String,
    model: String,
    pictures: Array,
    description: String,
    price: { type: Number, min: 0},
    milege: { type: Number, min: 0},
    car: {type: Schema.Types.ObjectId, ref: 'Car'},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ad", adSchema);