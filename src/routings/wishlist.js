// import express from "express";
// const router = express.Router();
const express = require("express");
const router = express.Router();

// import {
//   createWishlist,
// //   deleteWishlist,
// //   getMyWishlists,
// } from "../controllers/wishlistController.js";
// import { protect, admin, seller, buyer } from "../middleware/authMiddleware.js";
const wishlistController = require("../controllers/wishlist");

router.route("/").post(wishlistController.createWishlist).get(wishlistController.getMyWishlists);
// router.route("/:id").delete(protect, buyer, deleteWishlist);

// export default router;
module.exports = router;
