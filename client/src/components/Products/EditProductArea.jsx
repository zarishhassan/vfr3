import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import {
  listProductDetails,
  updateProduct,
} from "../../redux/Product/ProductAction";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCT_UPDATE_RESET } from "../../redux/Product/ProductTypes";

const EditProductArea = ({ match, history }) => {
  const prodId = match.params.id;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState("");
  const [totalInStock, setTotalInStock] = useState(0);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetailReducer = useSelector(
    (state) => state.productDetailReducer
  );
  const { loading, error, product } = productDetailReducer;

  const productUpdateReducer = useSelector(
    (state) => state.productUpdateReducer
  );
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
    product: productUpdate,
  } = productUpdateReducer;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/products");
    } else {
      if (!product.name || product._id !== prodId) {
        // dispatch(listProductDetails(prodId));
        console.log("Dispatch");
      } else {
        setName(product.name);
        setDescription(product.description);
        setType(product.type);
        setCategory(product.category);
        setPrice(product.price);
        setColor(product.color);
        setImage(product.image);
        setTotalInStock(product.total_in_stock);
      }
    }
  }, [history, dispatch, prodId, product, successUpdate]);

  // this is async since we are passing http request
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]; // you can upload multiple images, but we get 1st by files[0]
    const formData = new FormData(); // this is vanila JavaScript
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        header: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);

      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: prodId,
        name,
        description,
        type,
        category,
        price,
        color,
        image,
        totalInStock,
      })
    );
  };

  console.log(product.product);

  return (
    <div className="add-product-area-wrap ptb-50">
      <div className="container">
        <div className="add-product-form">
          {/* {message && (
            <div className={`alert alert-success`} role="alert">
              Product Created Successfully
            </div>
          )} */}

          <h2>Edit Product</h2>
          <hr />
          <form onSubmit={submitHandler} encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="product_name">Product Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                id="product_name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="product_description">Product Description</label>
              <textarea
                className="form-control"
                id="product_description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="product_images">Product Image</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Image URL"
                value={image}
                // accept="image/*"
                onChange={(e) => setImage(e.target.value)}
                // onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <div className="form-group">
              <label htmlFor="product_images">Choose File</label>
              <input
                type="file"
                // custom
                className="form-control"
                // placeholder="Enter Image URL"
                // value={image}
                // accept="image/*"
                onChange={uploadFileHandler}
                // onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <div className="form-group">
              <label htmlFor="product_type">Product Type</label>
              <select
                className="form-control"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option>All Type</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="category">Product Category</label>
              <select
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>All Type</option>
                <option value="eastern">Eastern Wear</option>
                <option value="western">Western Wear</option>
                <option value="evening">Evening Wear</option>
                <option value="winter">Winter Wear</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="product_color">Product Color</label>
              <input
                type="text"
                className="form-control"
                placeholder="Color"
                id="product_color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="product_price">Product Price</label>
              <input
                type="text"
                className="form-control"
                placeholder="Price"
                id="product_price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="product_totalInStock">Total in stock</label>
              <input
                type="text"
                className="form-control"
                placeholder="Total in stock"
                id="product_totalInStock"
                value={totalInStock}
                onChange={(e) => setTotalInStock(e.target.value)}
              />
            </div>
            <button className="add-product-btn">
              <i className="flaticon-shopping-cart add-product-btn-icon"></i>
              Edit Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(EditProductArea);
