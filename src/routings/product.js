const express = require("express");
const router = express.Router();

const checkAuth = require("../middlewares/check-auth");
const productController = require("../controllers/product");

router.get("/", productController.fetchProducts);
router.get("/fetch-product/:id", productController.fetchProduct);
router.post("/add-product", productController.addProduct);
router.post("/edit-product", productController.editProduct);
router.post("/delete-product", productController.deleteProduct);
router.post("/delete-product", productController.deleteProduct);
router.route("/:id/reviews").post(productController.createProductReview);

module.exports = router;
