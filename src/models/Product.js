const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true }, // This is the individual Rating
    comment: { type: String, required: true },

    // Associating User with the Review
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },

  {
    timestamps: true,
  }
);

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    // Men & WOmen
    type: String,
    required: true,
  },
  category: {
    // East, west
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  // size: {
  //   type: String,
  //   required: true,
  // },
  // image_public_id: {
  //   type: String,
  //   required: false
  // },
  price: {
    type: String,
    required: true,
    default: 0,
  },
  color: {
    type: String,
    required: true,
    default: "Black",
  },
  ratings: {
    type: String,
    required: false,
  },

  reviews: [reviewSchema],

  // reviews: [
  //   {
  //     name: String,
  //     // title: String,
  //     comment: String,
  //     rating: String,
  //     createdAt: String,
  //   },
  // ],
  total_in_stock: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
