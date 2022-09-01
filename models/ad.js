var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var adSchema = new mongoose.Schema(
  {
    title: String,
    pictures: Array,
    description: String,
    milege: { type: Number, min: 0},
    car: {type: Schema.Types.ObjectId, ref: 'Car'},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ad", adSchema);