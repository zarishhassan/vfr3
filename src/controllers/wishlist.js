// import asyncHandler from "express-async-handler";
// import Product from "../models/productModel.js";
// import User from "../models/userModel.js";
// import Wishlist from "../models/wishlistModel.js";

// const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Product = require("../models/Product");
const Wishlist = require("../models/Wishlist");
const genAccTkn = require("../helpers/genAccessToken");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../utils/validators");
const asyncHandler = require("express-async-handler");

// @desc    Create a new WishList
// @route   POST /api/wishlist
// @access  Private/Buyer
exports.createWishlist = asyncHandler(async (req, res) => {
  const { product, user } = req.body;

  const productt = await Product.findById(product);
  const userr = await User.findById(user);
  // const wishlist = await Wishlist.findOne({ product });

  // res.json(wishlist);

  // if (wishlist) {
  //   if (wishlist.user.toString() === req.user._id.toString()) {
  //     res.status(400);
  //     throw new Error("Already added in your wishlist");
  //   }
  // }

  if (productt && user) {
    const wishlist = new Wishlist({
      user,
      userName: userr.name,
      product,
      productName: productt.name,
      productImage: productt.image,
      productPrice: productt.price,
      productCountInStock: productt.countInStock,
    });

    const createdWishlist = await wishlist.save();

    res.status(201).json(createdWishlist);
  } else {
    res.status(400);
    throw new Error("Product or User not Exit");
  }
});

// @desc    Delete a WishList
// @route   DELETE /api/wishlist/:id
// @access  Private/Buyer
const deleteWishlist = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.findById(req.params.id);
  const user = await User.findById(req.user._id); // Current Logged in User

  // res.json(wishlist);

  if (wishlist.user.toString() === req.user._id.toString()) {
    await wishlist.remove();
    res.json({ message: "Wishlist Removed." });
  } else {
    res.status(404);
    throw new Error("This is not your wishlist");
  }
});

// @desc    Get logged in Buyer Wishlist
// @route   GET /api/wishlist
// @access  Private/Buyer
exports.getMyWishlists = asyncHandler(async (req, res) => {
//   const { user } = req.body;
  // res.json(userr)
  //   const user = req.user._id;
  const wishlists = await Wishlist.find({});

//   console.log(user);

//   let myWishlist = [];
//   if (wishlists) {
//     wishlists.map((wish) => {
//       if (wish.user.toString() === user) {
//         myWishlist.push(wish);
//       }
//     });
//   }
  res.json(wishlists);
});

// export { createWishlist, deleteWishlist, getMyWishlists };
