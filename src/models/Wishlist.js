const mongoose = require("mongoose");


const wishlistSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    userName: {
      type: String,
      required: true,
    },

    // userEmail: {
    //   type: String,
    //   // required: true,
    //   // unique: true,
    // },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },

    productName: {
      type: String,
      required: true,
    },

    productImage: {
      type: String,
      required: true,
    },

    productPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    productCountInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Wishlist", wishlistSchema);

// const Wishlist = mongoose.model("Wishlist", wishlistSchema);

// export default Wishlist;