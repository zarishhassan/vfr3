const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: { // Men & WOmen
    type: String,
    required: true,
  },
  category: { // East, west
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  // image_public_id: {
  //   type: String,
  //   required: false
  // },
  price: {
    type: String,
    required: true,
    default: 0

  },
  color: {
    type: String,
    required: true,
    default: "Black"
  },
  ratings: {
    type: String,
    required: false,
  },
  reviews: [
    {
      title: String,
      text: String,
      rating: String,
      username: String,
      createdAt: String,
    },
  ],
  total_in_stock: {
    type: Number,
    required: true,
    default: 0
  },
  createdAt: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
