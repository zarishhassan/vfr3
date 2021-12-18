import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { Image } from "cloudinary-react";
import axios from "axios";
import authContext from "../../contexts/auth-context";

function ProductsArea({ products, history, editProduct, deleteProduct }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState("");
  const [role, setRole] = useState("user");
  const [product, setProduct] = useState({});
  const [imagePublicId, setImagePublicId] = useState(null);
  const [product_images, setProductImages] = useState("");
  const context = useContext(authContext);

  useEffect(() => {
    axios
      .post("/user/check-role", {
        userId: context.userId,
      })
      .then((res) => setRole(res.data.role))
      .catch((err) => console.log(err));
  }, []);

  const goToDetails = (id) => {
    history.push(`/products-details/${id}`);
  };

  const openDeleteModal = (product, imagePublicId) => {
    setProduct(product);
    setImagePublicId(imagePublicId);
  };

  console.log('Edit  ', editProduct);

  const openEditModal = (product) => {
    console.log('Product Id ', product._id);
    setProduct(product);
    setName(product.name);
    setDescription(product.description);
    // setProductImages(product.image_public_id);
    setType(product.type);
    setCategory(product.category);
    setPrice(product.price);
    setColor(product.color);
    setInStock(product.total_in_stock);
    setImage(product.image);
    // setImagePublicId(imagePublicId);
  };

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

  const handleChange = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "econix");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(
      "https://api.cloudinary.com/v1_1/dfmn9nhqt/image/upload",
      formData,
      config
    );

    setProductImages(data.public_id);
  };

  return (
    <div className="products-area-wrap container">
      {true ? (
        <>
          <div className="container">
            <table className="order_list_table product_list_table">
              <thead>
                <tr className="order_table100_head">
                  <th className="order_column1">Image</th>
                  <th className="order_column1">Name</th>
                  <th className="order_column1">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((product, index) => {
                    return (
                      <tr key={product._id} className="product_tr">
                        <td className="order_column1">
                          <Image
                            src={product.image}
                            alt={product.name}
                            cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                            width="50"
                            // height="200px"
                            // style={{height: "300px"}}
                            crop="scale"
                          />
                          {/* <Image
                          key={index}
                          cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                          publicId={product.image_public_id}
                          width="50"
                          crop="scale"
                        /> */}
                        </td>
                        <td
                          onClick={() => goToDetails(product._id)}
                          style={{ cursor: "pointer" }}
                          className="order_column2"
                        >
                          {product.name}
                        </td>
                        <td className="order_column4">
                          <button
                            type="button"
                            onClick={() =>
                              openDeleteModal(product, product.imageId)
                            }
                            className="btn btn-danger"
                            data-toggle="modal"
                            data-target="#deleteModal"
                          >
                            Delete
                          </button>{" "}
                          <button
                            className="btn btn-primary"
                            data-toggle="modal"
                            data-target="#editModal"
                            onClick={
                              () => openEditModal(product)
                              // openEditModal(product, product.imageId)
                            }
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div
            className="modal fade"
            id="deleteModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="deleteModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="deleteModalLabel">
                    Delete - {product.name}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  Are you sure you want to delete?
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                    onClick={() => deleteProduct(product._id, imagePublicId)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="editModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="editModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="editModalLabel">
                    Edit - {name}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Product Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        placeholder="Product Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                        onChange={handleChange}
                      />
                    </div> */}

                    <div className="form-group">
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
                      {/* <label htmlFor="category">Product Category</label> */}
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
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Product Color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Product Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Total in stock"
                        value={inStock}
                        onChange={(e) => setInStock(e.target.value)}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    data-dismiss="modal"
                    onClick={() =>
                      editProduct(
                        product._id,
                        name,
                        description,
                        // product_images,
                        type,
                        category,
                        price,
                        color,
                        inStock,
                        image,
                      )
                    }
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h2>You are not allowed to view this page</h2>
      )}
    </div>
  );
}

export default withRouter(ProductsArea);
