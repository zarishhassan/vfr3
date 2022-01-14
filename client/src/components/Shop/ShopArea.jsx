import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";
import React, { useState } from "react";

function ShopArea({
  products = [],
  addToCart,
  page,
  pages,
  keyword,
  showQuickView,
}) {
  const [current, setCurrent] = React.useState(page);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [color, setColor] = useState("");
  const [filteredByPrice, setFilteredByPrice] = useState([]);
  const [filteredByColor, setFilteredByColor] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();

    setFilteredByPrice([]);

    // filteredByPrice = [];

    if (products && products.length > 0) {
      products
        .filter(
          (product) => product.price >= minValue && product.price <= maxValue
        )
        .map((filteredProduct) => {
          setFilteredByPrice((prev) => [...prev, filteredProduct]);
          // filteredByPrice.push(filteredProduct);
          console.log("Filtered Products ", filteredProduct);
        });
    }
    // setMinValue(0);
    // setMaxValue(0);
  };

  console.log("Filtered by Price", filteredByPrice);

  const submitColorHandler = (e) => {
    e.preventDefault();

    setFilteredByColor([]);

    // filteredByPrice = [];

    if (products && products.length > 0) {
      products
        .filter((product) => product.color === color.toLowerCase())
        .map((filteredProduct) => {
          setFilteredByColor((prev) => [...prev, filteredProduct]);
          console.log("Filtered Products ", filteredProduct);
        });
    }
  };

  console.log("Products in Shop", products);
  return (
    <section className="shop-Color bg-ffffff pt-50 pb-50">
      <div className="container">
        {/* <form onSubmit={submitHandler} encType="multipart/form-data">
          <div className="form-group" style={{ width: "20%" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Minimum Value"
              width="30%"
              // id="product_name"
              // value={name.length === 0 ? product.name : name}
              onChange={(e) => setMinValue(e.target.value)}
            />
          </div>
          <div className="form-group" style={{ width: "20%" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Maximum Value"
              width="30%"
              // id="product_name"
              // value={name.length === 0 ? product.name : name}
              onChange={(e) => setMaxValue(e.target.value)}
            />
          </div>
        </form> */}
        <div className="products-filter-options">
          <div className="row align-items-center">
            <div className="col-lg-2 col-md-2">
              <form onSubmit={submitHandler} encType="multipart/form-data">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Minimum Value"
                    onChange={(e) => setMinValue(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Maximum Value"
                    onChange={(e) => setMaxValue(e.target.value)}
                  />
                </div>
                <button className="add-product-btn float-right" type="submit">
                  Filter
                </button>
                {/* <p>Showing 1 – 18 of 100</p> */}
              </form>
            </div>
            <div className="col-lg-6 col-md-6"></div>

            <div className="col-lg-3 col-md-3">
              {/* <div className="products-ordering-list"> */}
              <form onSubmit={submitColorHandler}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Color"
                    onChange={(e) => setColor(e.target.value)}
                  />
                </div>

                <button className="add-product-btn float-right" type="submit">
                  Filter by Color
                </button>
              </form>
              {/* </div> */}
            </div>

            {/* <div className="col-lg-3 col-md-3">
              <div className="products-ordering-list">
                <select className="form-control">
                  <option>Sort by price: low to high</option>
                  <option>Default sorting</option>
                  <option>Sort by popularity</option>
                  <option>Sort by average rating</option>
                  <option>Sort by latest</option>
                  <option>Sort by price: high to low</option>
                </select>
              </div>
            </div> */}
          </div>
        </div>
        <div className="row">
          {filteredByPrice.length > 0
            ? filteredByPrice.map((product) => (
                <div className="col-lg-3 col-sm-6" key={product._id}>
                  <div className="single-shop-products">
                    <div className="shop-products-image">
                      <Link to={`/products-details/${product._id}`}>
                        <Image
                          src={product.image}
                          alt={product.name}
                          cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                          width="300"
                          // height="200px"
                          style={{ height: "400px" }}
                          crop="scale"
                        />
                        {/* <Image
                      key={product._id}
                      cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                      publicId={product.image_public_id}
                      width="300"
                      crop="scale"
                    /> */}
                      </Link>
                      <div className="tag">New</div>
                      <ul className="shop-action">
                        {/* <li>
                      <span
                        className="addtocart-icon-wrap"
                        onClick={() => addToCart(product)}
                      >
                        <i className="flaticon-shopping-cart"></i>
                      </span>
                    </li> */}
                        {/* <li>
                      <Link to="#">
                        <i className="flaticon-heart"></i>
                      </Link>
                    </li> */}
                        <li>
                          <span
                            onClick={() => showQuickView(product)}
                            data-toggle="modal"
                            data-target="#productsQuickView"
                            className="quick-icon"
                          >
                            <i className="flaticon-view"></i>
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="shop-products-content">
                      <h3>
                        <Link to={`/products-details/${product._id}`}>
                          {product.name}
                        </Link>
                      </h3>
                      {/* <ul className="rating">
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                  </ul> */}
                      <span>RS {product.price}</span>
                    </div>
                  </div>
                </div>
              ))
            : filteredByColor.length > 0
            ? filteredByColor.map((product) => (
                <div className="col-lg-3 col-sm-6" key={product._id}>
                  <div className="single-shop-products">
                    <div className="shop-products-image">
                      <Link to={`/products-details/${product._id}`}>
                        <Image
                          src={product.image}
                          alt={product.name}
                          cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                          width="300"
                          // height="200px"
                          style={{ height: "400px" }}
                          crop="scale"
                        />
                        {/* <Image
                      key={product._id}
                      cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                      publicId={product.image_public_id}
                      width="300"
                      crop="scale"
                    /> */}
                      </Link>
                      <div className="tag">New</div>
                      <ul className="shop-action">
                        {/* <li>
                      <span
                        className="addtocart-icon-wrap"
                        onClick={() => addToCart(product)}
                      >
                        <i className="flaticon-shopping-cart"></i>
                      </span>
                    </li> */}
                        {/* <li>
                      <Link to="#">
                        <i className="flaticon-heart"></i>
                      </Link>
                    </li> */}
                        <li>
                          <span
                            onClick={() => showQuickView(product)}
                            data-toggle="modal"
                            data-target="#productsQuickView"
                            className="quick-icon"
                          >
                            <i className="flaticon-view"></i>
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="shop-products-content">
                      <h3>
                        <Link to={`/products-details/${product._id}`}>
                          {product.name}
                        </Link>
                      </h3>
                      {/* <ul className="rating">
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                  </ul> */}
                      <span>RS {product.price}</span>
                    </div>
                  </div>
                </div>
              ))
            : products.map((product) => (
                <div className="col-lg-3 col-sm-6" key={product._id}>
                  <div className="single-shop-products">
                    <div className="shop-products-image">
                      <Link to={`/products-details/${product._id}`}>
                        <Image
                          src={product.image}
                          alt={product.name}
                          cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                          width="300"
                          // height="200px"
                          style={{ height: "400px" }}
                          crop="scale"
                        />
                        {/* <Image
                      key={product._id}
                      cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                      publicId={product.image_public_id}
                      width="300"
                      crop="scale"
                    /> */}
                      </Link>
                      <div className="tag">New</div>
                      <ul className="shop-action">
                        {/* <li>
                      <span
                        className="addtocart-icon-wrap"
                        onClick={() => addToCart(product)}
                      >
                        <i className="flaticon-shopping-cart"></i>
                      </span>
                    </li> */}
                        {/* <li>
                      <Link to="#">
                        <i className="flaticon-heart"></i>
                      </Link>
                    </li> */}
                        <li>
                          <span
                            onClick={() => showQuickView(product)}
                            data-toggle="modal"
                            data-target="#productsQuickView"
                            className="quick-icon"
                          >
                            <i className="flaticon-view"></i>
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="shop-products-content">
                      <h3>
                        <Link to={`/products-details/${product._id}`}>
                          {product.name}
                        </Link>
                      </h3>
                      {/* <ul className="rating">
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                  </ul> */}
                      <span>RS {product.price}</span>
                    </div>
                  </div>
                </div>
              ))}
          {/* {products &&
            products.map((product) => (
              <div className="col-lg-3 col-sm-6" key={product._id}>
                <div className="single-shop-products">
                  <div className="shop-products-image">
                    <Link to={`/products-details/${product._id}`}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                        width="300"
                        // height="200px"
                        style={{ height: "400px" }}
                        crop="scale"
                      />
                      
                    </Link>
                    <div className="tag">New</div>
                    <ul className="shop-action">
                      
                      <li>
                        <span
                          onClick={() => showQuickView(product)}
                          data-toggle="modal"
                          data-target="#productsQuickView"
                          className="quick-icon"
                        >
                          <i className="flaticon-view"></i>
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="shop-products-content">
                    <h3>
                      <Link to={`/products-details/${product._id}`}>
                        {product.name}
                      </Link>
                    </h3>
                    
                    <span>RS {product.price}</span>
                  </div>
                </div>
              </div>
            ))} */}

          <div className="col-lg-12 col-md-12">
            <div className="pagination-area">
              <Link to={`/page/${page - 1}`} className="prev page-numbers">
                <i className="flaticon-left-arrow"></i>
              </Link>

              {[...Array(pages).keys()].map((x) => (
                <div key={x + 1}>
                  <Link
                    to={
                      keyword
                        ? `/search/${keyword}/page/${x + 1}`
                        : `/page/${x + 1}`
                    }
                  >
                    <span
                      className={
                        x + 1 === page ? "current page-numbers" : "page-numbers"
                      }
                    >
                      {x + 1}
                    </span>
                  </Link>
                </div>
              ))}

              <Link to={`/page/${page + 1}`} className="next page-numbers">
                <i className="flaticon-right-arrow"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShopArea;
