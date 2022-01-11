import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cart6 from "../../assets/img/cart/cart-6.jpg";
import cart7 from "../../assets/img/cart/cart-7.jpg";
import cart8 from "../../assets/img/cart/cart-8.jpg";
import cart4 from "../../assets/img/cart/cart-4.png";
import cart5 from "../../assets/img/cart/cart-5.png";
import { Link } from "react-router-dom";
import { listMyWishlist } from "../../redux/Wishlist/WishlistAction";

// import { listMyWishlist } from "../actions/wishlistActions";

function WishListArea() {
  const [userId, setUserId] = useState("");

  const dispatch = useDispatch();

  const wishlistMy = useSelector((state) => state.wishlistMy);
  const { loading, error, wishlists } = wishlistMy;

  // const wishlistDelete = useSelector((state) => state.wishlistDelete);
  // const {
  //   loading: loadingDelete,
  //   error: errorDelete,
  //   success: successDelete,
  // } = wishlistDelete;

  useEffect(() => {
    const _token = JSON.parse(localStorage.getItem("token"));

    const tokenExp = JSON.parse(localStorage.getItem("tokenExpiration"));
    const userIdLocal = JSON.parse(localStorage.getItem("userId"));
    const userRoleLocal = JSON.parse(localStorage.getItem("role"));
    const userNameLocal = JSON.parse(localStorage.getItem("name"));
    if (_token && userIdLocal && tokenExp) {
      // setToken(_token);
      setUserId(userIdLocal);
      // setUserRole(userRoleLocal);
      // setTokenExpiration(tokenExp);
    }
    // const _cartItems = JSON.parse(localStorage.getItem("cart-items"));
    // if (_cartItems && _cartItems.length > 0) {
    //   setCartItems(_cartItems);
    // }
  }, []);
  console.log(userId);

  useEffect(() => {
    // const user = userId
    dispatch(listMyWishlist());
    // dispatch(listMyWishlist({user: userId}));
  }, [dispatch]);

  let myWishList = [];
  if (wishlists && wishlists.length > 0) {
    wishlists.map((wish) => {
      if (wish.user === userId) {
        myWishList.push(wish);
      }
    });
  }

  if (myWishList.length > 0) {
    console.log("My WishList ", myWishList);
  }

  // const removeFromCartHandler = (id) => {
  //   console.log(id);
  //   if (window.confirm("Are you sure")) {
  //     dispatch(deleteWishlist(id));
  //   }
  // };

  return (
    <section className="wishlist-area ptb-50">
      <div className="container">
        <div className="wishlist-table table-responsive">
          <div className="wishlist-title">
            <h2>My Wishlist</h2>
          </div>
          {loading && <div>loading...!!</div>}

          {myWishList && myWishList.length > 0 ? (
            myWishList.map((wish) => (
              <table className="table table-bordered">
                <tbody>
                  <tr key={wish._id}>
                    <td className="product-remove">
                      <a href="#" className="remove">
                        <i className="bx bx-x"></i>
                      </a>
                    </td>
                    <td className="product-thumbnail">
                      <a href="#">
                        <img src={wish.productImage} alt="item" />
                      </a>
                    </td>
                    <td className="product-name">
                  <Link to={`/products-details/${wish.product}`}>
                    {wish.productName}
                  </Link>
                </td>
                    <td className="product-price">
                      <span className="unit-amount">{wish.productPrice} PKR</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            ))
          ) : (
            <h1>Your Wishlist is Empty</h1>
          )}

          {/* <table className="table table-bordered">
            <tbody>
              <tr>
                <td className="product-remove">
                  <a href="#" className="remove">
                    <i className="bx bx-x"></i>
                  </a>
                </td>

                <td className="product-thumbnail">
                  <a href="#">
                    <img src={cart6} alt="item" />
                  </a>
                </td>

                <td className="product-name">
                  <Link to="/products-details/60447200e3108c0a9086757c">
                    Khaddar Suit
                  </Link>
                </td>

                <td className="product-price">
                  <span className="unit-amount">RS 75.00</span>
                </td>

                <td className="product-stock">
                  <span className="stock">In Stock</span>
                </td>

                <td className="product-btn">
                  <a href="#" className="default-btn">
                    <i className="flaticon-shopping-cart"></i>
                    Add to Cart
                    <span></span>
                  </a>
                </td>
              </tr>

              <tr>
                <td className="product-remove">
                  <a href="#" className="remove">
                    <i className="bx bx-x"></i>
                  </a>
                </td>

                <td className="product-thumbnail">
                  <a href="#">
                    <img src={cart7} alt="item" />
                  </a>
                </td>

                <td className="product-name">
                  <Link to="/products-details/60447200e3108c0a9086757c">
                    Khaas Suit
                  </Link>
                </td>

                <td className="product-price">
                  <span className="unit-amount">RS 175.00</span>
                </td>

                <td className="product-stock">
                  <span className="stock">In Stock</span>
                </td>

                <td className="product-btn">
                  <a href="#" className="default-btn">
                    <i className="flaticon-shopping-cart"></i>
                    Add to Cart
                    <span></span>
                  </a>
                </td>
              </tr>

              <tr>
                <td className="product-remove">
                  <a href="#" className="remove">
                    <i className="bx bx-x"></i>
                  </a>
                </td>

                <td className="product-thumbnail">
                  <a href="#">
                    <img src={cart8} alt="item" />
                  </a>
                </td>

                <td className="product-name">
                  <Link to="/products-details/60447200e3108c0a9086757c">
                    Eastern Shirt
                  </Link>
                </td>

                <td className="product-price">
                  <span className="unit-amount">RS 175.00</span>
                </td>

                <td className="product-stock">
                  <span className="stock">In Stock</span>
                </td>

                <td className="product-btn">
                  <a href="#" className="default-btn">
                    <i className="flaticon-shopping-cart"></i>
                    Add to Cart
                    <span></span>
                  </a>
                </td>
              </tr>

              
            </tbody>
          </table> */}
        </div>
      </div>
    </section>
  );
}

export default WishListArea;
