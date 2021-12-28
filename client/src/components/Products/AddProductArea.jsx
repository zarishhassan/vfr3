import React, { useEffect, useState } from "react";
import axios from "axios";
import validate from "./validateinfo";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../redux/Product/ProductAction";

function AddProductArea() {
  const dispatch = useDispatch();

  // useSelector selects value from store
  const productCreateReducer = useSelector(
    (state) => state.productCreateReducer
  );
  const { loading, error, success, product } = productCreateReducer; // destructure, coming from reducer

  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [product_type, setProductType] = useState("");
  const [product_color, setProductColor] = useState("");
  const [product_price, setProductPrice] = useState("");
  const [product_size, setProductSize] = useState("");
  const [product_totalInStock, setTotalInStock] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState(false);
  const [errors, setErrors] = useState({});

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

      const { data } = await axios.post("/upload", formData, config);

      setImage(data);

      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        name: product_name,
        description: product_description,
        type: product_type,
        price: product_price,
        category,
        color: product_color,
        total_in_stock: product_totalInStock,
        image: image,
        // size: product_size
      })
    );
    setMessage(true)
    //   const formData = new FormData();
    //   formData.append("product_name", product_name);
    //   formData.append("product_description", product_description);
    //   // formData.append("file", product_images);
    //   formData.append("product_type", product_type);
    //   formData.append("product_color", product_color);
    //   formData.append("product_price", product_price);
    //   formData.append("total_in_stock", product_totalInStock);
    //   formData.append("upload_preset", "econix");
    //   setErrors(validate(formData));

    //   axios
    //     .post("https://api.cloudinary.com/v1_1/dfmn9nhqt/image/upload", formData)
    //     .then((res) => {
    //       if (res.statusText === "OK") {
    //         let image_public_id = res.data.public_id;
    //         formData.append("image_public_id", image_public_id);
    //         return axios
    //           .post("/products/add-product", formData, {
    //             headers: {
    //               "Content-Type": "multipart/form-data",
    //             },
    //           })
    //           .then((res) => {
    //             if (res.data.message === "Product added") {
    //               setMessage(product_name + " added");
    //               setProductName("");
    //               setProductDescription("");
    //               setProductType("");
    //               // setProductImages("");
    //               setProductColor("");
    //               setProductPrice("");
    //               setTotalInStock("");
    //               setErrors('');
    //             }
    //           });
    //       }
    //     })
    //     .catch((err) => console.log(err));
  };


  return (
    <div className="add-product-area-wrap ptb-50">
      <div className="container">
        <div className="add-product-form">
          {message && (
            <div className={`alert alert-success`} role="alert">
              Product Created Successfully
            </div>
          )}
         
          <h2>Add Product</h2>
          <hr />
          <form onSubmit={handleAddProduct} encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="product_name">Product Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                id="product_name"
                value={product_name}
                onChange={(e) => setProductName(e.target.value)}
              />
              {product_name === "" && (
                <p className="error_color">{errors.product_name}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="product_description">Product Description</label>
              <textarea
                className="form-control"
                id="product_description"
                value={product_description}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Description"
              ></textarea>
              {product_description === "" && (
                <p className="error_color">{errors.product_description}</p>
              )}
            </div>

            {/* <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>

              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              ></Form.File>

              {uploading && <Loader />}
            </Form.Group> */}


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
              {/* {image === '' && <p className="error_color">{errors.product_images}</p>} */}
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
              {/* {image === '' && <p className="error_color">{errors.product_images}</p>} */}
            </div>

            {/* <div className="form-group">
              <label htmlFor="product_images">Product Image</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => setImage(e.target.value)}
                // onChange={(e) => setImage(e.target.files[0])}
              />
              {image === '' && <p className="error_color">{errors.product_images}</p>}
            </div> */}

            <div className="form-group">
              <label htmlFor="product_type">Product Type</label>
              <select
                className="form-control"
                value={product_type}
                onChange={(e) => setProductType(e.target.value)}
              >
                <option>All Type</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                {/* <option value="beauty_picks">Beauty Picks</option>
                <option value="cameras">Cameras</option>
                <option value="computers">Computers</option>
                <option value="electronics">Electronics</option>
                <option value="laptop">Laptop</option>
                <option value="mobile">Mobile</option>
                <option value="watches">Watches</option>
                <option value="headphone">Headphone</option> */}
              </select>
              {product_type === "" && (
                <p className="error_color">{errors.product_type}</p>
              )}
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
                {/* <option value="beauty_picks">Beauty Picks</option>
                <option value="cameras">Cameras</option>
                <option value="computers">Computers</option>
                <option value="electronics">Electronics</option>
                <option value="laptop">Laptop</option>
                <option value="mobile">Mobile</option>
                <option value="watches">Watches</option>
                <option value="headphone">Headphone</option> */}
              </select>
              {category === "" && (
                <p className="error_color">{errors.category}</p>
              )}
            </div>

            {/* <div className="form-group">
              <label htmlFor="category">Product Size</label>
              <select
                className="form-control"
                value={product_size}
                onChange={(e) => setProductSize(e.target.value)}
              >
                <option>All Type</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="xl">Extra Large</option>
              </select>
              {product_size === "" && (
                <p className="error_color">{errors.product_size}</p>
              )}
            </div> */}

            <div className="form-group">
              <label htmlFor="product_color">Product Color</label>
              <input
                type="text"
                className="form-control"
                placeholder="Color"
                id="product_color"
                value={product_color}
                onChange={(e) => setProductColor(e.target.value)}
              />
              {product_color === "" && (
                <p className="error_color">{errors.product_color}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="product_price">Product Price</label>
              <input
                type="text"
                className="form-control"
                placeholder="Price"
                id="product_price"
                value={product_price}
                onChange={(e) => setProductPrice(e.target.value)}
              />
              {product_price === "" && (
                <p className="error_color">{errors.product_price}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="product_totalInStock">Total in stock</label>
              <input
                type="text"
                className="form-control"
                placeholder="Total in stock"
                id="product_totalInStock"
                value={product_totalInStock}
                onChange={(e) => setTotalInStock(e.target.value)}
              />
              {product_totalInStock === "" && (
                <p className="error_color">{errors.product_totalInStock}</p>
              )}
            </div>
            <button className="add-product-btn">
              <i className="flaticon-shopping-cart add-product-btn-icon"></i>Add
              Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProductArea;
