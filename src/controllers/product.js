const Product = require("../models/Product");
const { cloudinary } = require("../utils/cloudinary");
const asyncHandler = require("express-async-handler");

exports.fetchProducts = async (req, res) => {
  try {
    const pageSize = 30;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } catch (err) {
    res.status(500);
  }
};

exports.addProduct = async (req, res) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const type = req.body.type;
    const category = req.body.category;
    const price = req.body.price;
    const color = req.body.color;
    const image = req.body.image;
    const size = req.body.size;
    const total_in_stock = req.body.total_in_stock;
    // const file = req.files.file;

    const product = new Product({
      name,
      description,
      type,
      category,
      price,
      color,
      image,
      // size,
      // image_public_id,
      reviews: [],
      total_in_stock,
      createdAt: new Date().toISOString(),
    });

    await product.save();

    return res.status(200).json(product);
  } catch (err) {
    res.status(500);
  }
};

exports.fetchProduct = async (req, res) => {
  try {
    const id = req.params.productId;
    // const product = await Product.findById({ _id: id });
    const product = await Product.findById(req.params.id);

    res.status(200).json({
      product,
    });
  } catch (err) {
    res.status(500);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.body.productId;

    await Product.deleteOne({ _id: productId });
    const products = await Product.find({});

    return res.status(200).json({ message: "Successfully Deleted", products });
  } catch (err) {
    res.status(500);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    const product = await Product.findById({
      _id,
    });

    // res.json(product);

    if (product) {
      product.name = req.body.name || product.name;
      product.description = req.body.description || product.description;
      product.type = req.body.type || product.type;
      product.category = req.body.category || product.category;
      product.price = req.body.price || product.price;
      product.color = req.body.color || product.color;
      product.image = req.body.image || product.image;
      product.total_in_stock = req.body.total_in_stock || product.total_in_stock;

      const updatedProduct = await product.save();

      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product Not Found");
    }
  } catch (err) {
    res.status(500);
  }
};

exports.editProduct = async (req, res) => {
  try {
    const prodId = req.body.product_id;
    const name = req.body.product_name;
    const description = req.body.product_description;
    const type = req.body.product_type;
    const category = req.body.product_category;
    const price = req.body.product_price;
    const color = req.body.product_color;
    // const image_public_id = req.body.image_public_id;
    const image = req.body.image;
    const total_in_stock = req.body.total_in_stock;

    // const product = await Product.findById({_id: prodId});

    // if (product) {
    //   product._id = prodId;
    //   product.name = name;
    //   product.price = price;
    //   product.description = description;
    //   product.image = image;
    //   product.type = type;
    //   product.category = category;
    //   product.total_in_stock = total_in_stock;
    //   product.color = color;

    //   const updatedProduct = await product.save();
    //   res.json(updatedProduct);
    // } else {
    //   res.status(404);
    //   throw new Error("Product Not Found");
    // }

    const product = await Product.updateOne(
      { _id: prodId },
      {
        $set: {
          name,
          description,
          type,
          category,
          price,
          color,
          total_in_stock,
          image,
          // image_public_id
        },
      }
    );
    res.status(200).json({
      message: "Product edited",
      product,
    });
    Product.save();
  } catch (err) {
    res.status(500);
  }
};

// @desc    Create a new Review
// @route   POST /api/products/:id/reviews
// access   Private
exports.createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    // checking if user already reviewed
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product Already Reviewed");
    }

    // if not already Reviewed then create a new review
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    // [pushing] new review to products
    product.reviews.push(review);

    // Update the NumReviews Field
    product.numReviews = product.reviews.length;

    // updating total reiews | accumulator starts at 0 | by dividing it gives average
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review Added" });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

// exports.editProduct = async (req, res) => {

//   try {
//     const prodId = req.body.product_id;
//     const name = req.body.product_name;
//     const description = req.body.product_description;
//     const type = req.body.product_type;
//     const category = req.body.product_category;
//     const price = req.body.product_price;
//     const color = req.body.product_color;
//     // const image_public_id = req.body.image_public_id;
//     const image = req.body.image;
//     const total_in_stock = req.body.total_in_stock;

//     const product = await Product.updateOne(
//       { _id: prodId },
//       {
//         $set: {
//           name,
//           description,
//           type,
//           category,
//           price,
//           color,
//           total_in_stock,
//           image
//           // image_public_id
//         },
//       }
//     );
//     res.status(200).json({
//       message: "Product edited",
//       product
//     })

//   } catch(err) {
//     res.status(500);
//   }
// }
