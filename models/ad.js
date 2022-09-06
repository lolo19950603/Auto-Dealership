var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var contactSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    postal: String
  },
  {
    timestamps: true,
  }
);

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
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    likedBy: [{type: Schema.Types.ObjectId, ref: 'User'}],
    contact: contactSchema
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ad", adSchema);