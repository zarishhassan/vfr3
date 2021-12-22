import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

//actions
import { listProducts } from "../../redux/Product/ProductAction";

//components
import Footer from "../../components/Footer/Footer";
import NewArrivals from "../../components/Common/NewArrivals";
import Support from "../../components/Common/Support";
import BestSellers from "../../components/Common/BestSellers";
import LatestNews from "../../components/Common/LatestNews";
import Collection from "../../components/Common/Collection";
import Overview from "../../components/Home/Home-one/Overview";
import Banner from "../../components/Home/Home-one/Banner";
import Partner from "../../components/Common/Partner";
import SpecialOffer from "../../components/Home/Home-one/SpecialOffer";
import SpecialProducts from "../../components/Home/Home-one/SpecialProducts";
import QuickView from "../../components/Products/QuickView";
import Preloader from "../../components/Common/Preloader";
import cartContext from "../../contexts/cart-context";
import "./Home.scss";

function TryRoom() {
  const [image, setImage] = useState("");
  const [heightFt, setHeightFt] = useState(0);
  const [heightInch, setHeightInch] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState("");

  const [product, setProduct] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setisLoading] = useState(true);

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productReducer);
  const context = useContext(cartContext);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 1000);
  }, []);

  const showQuickView = (product) => {
    setIsOpen(true);
    setProduct(product);
  };

  const closeModal = () => {
    setIsOpen(false);
    setProduct({});
  };

  const addToCart = (product) => {
    let currentItem = {
      _id: product._id,
      name: product.name,
      price: product.price,
      type: product.type,
      total_in_stock: product.total_in_stock,
      image_public_id: product.image_public_id,
      quantity,
    };
    context.addItemToCart(currentItem);
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

  var image1 =
    "D:/Fyp_project/body measurement-20211215T083927Z-001/body measurement/body measure/body measure/talha.jpeg"; //**** */ var
  var image2 =
    "D:/Fyp_project/body measurement-20211215T083927Z-001/body measurement/body measure/body measure/n.jpg"; //**** */ var

  const handleSubmit = async (e) => {
    e.preventDefault();

    const height = heightFt * 30.48 + heightInch * 2.54;
    console.log("Inside Submit ", heightFt, heightInch, image, height);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const info = { image: image1, height };

    await axios
      .post("http://127.0.0.1:5000/bodymeasure", info, config)
      // .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log("data ", data.data.students[0]);
          setResults(data.data.students[0]);
        }
      })
      .catch((err) => console.log("Error ", err));
  };

  console.log("results ", results);

  var temp = "Temp";
  var height = 20;
  const infor = { temp, height };

  var leg = -1;
  var chest = -1;
  var arms = -1;
  var waist = -1;

  return (
    <>
      <div className="add-product-area-wrap ptb-50">
        <div className="container">
          <div className="add-product-form">
            {/* {message && (
            <div className={`alert alert-success`} role="alert">
              Product Created Successfully
            </div>
          )} */}

            <h2>Virtual Try Room</h2>
            <hr />
            <form onSubmit={handleSubmit}>
              {/* <form> */}
              <div className="form-group">
                <label htmlFor="product_images">Upload Image</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Image URL"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
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
                {/* {image === '' && <p className="error_color">{errors.product_images}</p>} */}
              </div>

              <div className="form-group">
                <label htmlFor="height_ft">Enter Feet (Height)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Feet"
                  id="feet"
                  value={heightFt}
                  onChange={(e) => setHeightFt(e.target.value)}
                />
                {/* {product_price === "" && (
                <p className="error_color">{errors.product_price}</p>
              )} */}
              </div>
              <div className="form-group">
                <label htmlFor="height_inch">Enter Inches (Height)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Inch"
                  id="inch"
                  value={heightInch}
                  onChange={(e) => setHeightInch(e.target.value)}
                />
                {/* {product_totalInStock === "" && (
                <p className="error_color">{errors.product_totalInStock}</p>
              )} */}
              </div>
              <button
                className="add-product-btn"
                type="submit"
                data-toggle="modal"
                data-target="#editModal"
                onClick={handleSubmit}
              >
                {/* <i className="flaticon-shopping-cart add-product-btn-icon"></i> */}
                Upload
              </button>
            </form>
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
                Results
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
                <div className="form-group form-control">
                  Arm Size: {results !== null && results.Arms * 0.394}
                </div>
                <div className="form-group form-control">
                  Chest Size: {results !== null && results.Chest * 0.394}
                </div>
                <div className="form-group form-control">
                  Leg Size: {results !== null && results.Leg * 0.394}
                </div>

                <div className="form-group form-control">
                  Waist Size: {results !== null && results.Waist * 0.394}
                </div>

                {results.Chest * 0.394 < 15 ? (
                  <div className="form-group form-control">
                    Shirt Size: Small
                  </div>
                ) : results.Chest * 0.394 >= 15 &&
                  results.Chest * 0.394 <= 25 ? (
                  <div className="form-group form-control">
                    Shirt Size: Medium
                  </div>
                ) : (
                  <div className="form-group form-control">
                    Shirt Size: Large
                  </div>
                )}

                <div className="form-group form-control">
                  Pant Size: {results !== null && results.Waist * 0.394}
                </div>
              </form>
            </div>
            {/* <div className="modal-footer">
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
                </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default TryRoom;
