import React, { useContext, useState, useEffect } from "react";
import CartContext from "../../contexts/cart-context";
import AuthContext from "../../contexts/auth-context";
import { PayPalButton } from "react-paypal-button-v2";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

function CheckoutArea() {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [message, setMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [sdkReady, setSdkReady] = useState(false);
  const [order, setOrder] = useState(null);
  const [token, setToken] = useState(null);

  const context = useContext(CartContext);
  const authContext = useContext(AuthContext);

  context.cartItems.itemsPrice =
    context.cartItems &&
    context.cartItems.reduce((count, curItem) => {
      return count + parseInt(curItem.price) * parseInt(curItem.quantity || 0);
    }, 0);

  // when the page or component loads, we will add it here the client id
  useEffect(() => {
    // if (!userInfo) {
    //   history.push("/login");
    // }

  //   let isMounted = true;               // note mutable flag
  // someAsyncOperation().then(data => {
  //   if (isMounted) setState(data);    // add conditional check
  // })
  // return () => { isMounted = false };

    const _token = JSON.parse(localStorage.getItem("token"));
    if (_token) {
      setToken(_token);
      console.log("Token ", token);
    }

    const addPayPalScript = async () => {
      // fetching Data from the Client ID
      const { data: clientId } = await axios.get("/config/paypal");
      // console.log("clientId", data);

      // <script
      //   type="text/javascript"
      //   src="https://www.paypal.com/sdk/js?client-id=AQwOmcQ7Dg4IzKkysyblW84-J_cD_z9bnd_V7T8W2RoMU9LvC_3gS6T8vLLuQJc3RZ0W4H5QhdN7ljC4"
      // ></script>;

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.setAttribute("data-namespace", "paypal_sdk");
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
        console.log("Sdk on oload", sdkReady);
      };
      document.body.appendChild(script); // dynamically adding PayPal Script
    };

    // console.log("Window ", window.paypal);

    // if (!order || successPay || successDeliver) {
    //   dispatch({ type: ORDER_PAY_RESET });
    //   dispatch({ type: ORDER_DELIVER_RESET });

    //   dispatch(getOrderDetails(orderId));
    // } else if (!order.isPaid) {
    if (order && !order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
        console.log("Add Paypal", window.paypal);
      } else {
        console.log("Sdk REady");
        setSdkReady(true);
      }
    }
    addPayPalScript();

    // }
  }, [order]);
  // }, [dispatch, orderId, successPay, successDeliver, order]);

  const submitOrder = (e) => {
    e.preventDefault();
    if (!authContext.userId && !authContext.token) {
      setMessage("You need to login first");
      return;
    }
    axios
      .post("/order/add-order-info", {
        userId: authContext.userId,
        firstName,
        lastName,
        companyName,
        email,
        phone,
        country,
        address,
        city,
        postCode,
        orderNotes,
        totalPrice: context.cartItems.itemsPrice,
        paymentMethod,
      })
      .then((res) => {
        if (res?.data?.message === "Order successfully added") {
          console.log("Inside Res", res.data.order);
          setOrder(res.data.order);
          localStorage.removeItem("cart-items");
          setFirstName("");
          setLastName("");
          setCompanyName("");
          setEmail("");
          setPhone("");
          setCountry("");
          setAddress("");
          setCity("");
          setPostCode("");
          setOrderNotes("");
          // setPaymentMethod("");
          setMessage(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const successPaymentHandler = (paymentResult) => {
    console.log("payment result ", paymentResult);
    // console.log(order)

    console.log("Token insice button", token);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios.put(`/order/${order._id}/pay`, paymentResult, config).then((res) => {
      // dispatch({});
      // return {};
      if (res?.data) {
        console.log("Inside Res After Payment", res.data);
        setOrder(res.data);

        //   setOrder(res.data.order);
        //   localStorage.removeItem("cart-items");
        //   setFirstName("");
        //   setLastName("");
        //   setCompanyName("");
        //   setEmail("");
        //   setPhone("");
        //   setCountry("");
        //   setAddress("");
        //   setCity("");
        //   setPostCode("");
        //   setOrderNotes("");
        //   // setPaymentMethod("");
        //   setMessage(res.data.message);
      }
    });
    // dispatch(payOrder(orderId, paymentResult));
  };

  console.log("Order ", order);

  return (
    <section className="checkout-area ptb-50">
      <div className="container">
        {message !== "" && (
          <div
            className={`
        ${
          message === "Order successfully added"
        } ? alert alert-success : alert alert-danger 
      `}
            role="alert"
          >
            {message}
          </div>
        )}
        <form onSubmit={submitOrder}>
          <div className="row">
            <div className="col-lg-8 col-md-12">
              {/* <div className="user-actions">
                <i className="bx bx-log-in"></i>
                <span>
                  Returning customer? <a href="#">Click here to login</a>
                </span>
              </div>

              <div className="user-actions-2">
                <i className="bx bx-code-alt"></i>
                <span>
                  Have a coupon? <a href="#">Click here to enter your code</a>
                </span>
              </div> */}

              <div className="billing-details">
                <h3 className="title">Billing Details</h3>

                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>
                        First Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>
                        Last Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Company Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Company Name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>
                        Email Address <span className="required">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>
                        Phone <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>
                        Country <span className="required">*</span>
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>
                        Address <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>
                        Town / City <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Town / City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>
                        Postcode <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Postcode"
                        value={postCode}
                        onChange={(e) => setPostCode(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* <div className="col-lg-12 col-md-12">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="create-an-account"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="create-an-account"
                      >
                        Create an account?
                      </label>
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="ship-different-address"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="ship-different-address"
                      >
                        Ship to a different address?
                      </label>
                    </div>
                  </div> */}

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <textarea
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        name="notes"
                        id="notes"
                        cols="30"
                        rows="5"
                        placeholder="Order Notes"
                        className="form-control"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-12">
              <div className="order-details">
                <div className="cart-totals">
                  <h3>Cart Totals</h3>

                  <ul>
                    <li>
                      Subtotal{" "}
                      <span>
                        RS
                        {context.cartItems &&
                          context.cartItems.reduce((count, curItem) => {
                            return (
                              count +
                              parseInt(curItem.price) *
                                parseInt(curItem.quantity || 0)
                            );
                          }, 0)}
                      </span>
                    </li>
                    <li>
                      Shipping <span>RS30.00</span>
                    </li>
                    <li>
                      Total{" "}
                      <span>
                        RS
                        {context.cartItems &&
                          context.cartItems.reduce((count, curItem) => {
                            return (
                              count +
                              parseInt(curItem.price) *
                                parseInt(curItem.quantity || 0)
                            );
                          }, 0) + 30}
                      </span>
                    </li>
                    <li>
                      Payable Total{" "}
                      <span>
                        RS
                        {context.cartItems &&
                          context.cartItems.reduce((count, curItem) => {
                            return (
                              count +
                              parseInt(curItem.price) *
                                parseInt(curItem.quantity || 0)
                            );
                          }, 0) + 30}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="payment-box">
                  <h3 className="title">Payment Method</h3>

                  <div className="payment-method">
                    <p>
                      <input
                        type="radio"
                        id="cash-on-delivery"
                        name="paymentMethod"
                        // name="radio-group"
                        value="PayPal"
                        // checked
                        onChange={(e) => setPaymentMethod("PayPal")}
                      />
                      <label htmlFor="cash-on-delivery">PayPal</label>
                    </p>

                    {/* <p>
                      <input
                        type="radio"
                        id="PayPal"
                        // name="paymentMethod"
                        name="paymentMethod"
                        value="PayPal"
                        // label="PayPal"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        // onChange={(e) => {console.log(e.target.value)}}
                      />
                      <label htmlFor="paypal">PayPal</label>
                    </p> */}
                    {/* <p>
                      <input
                        type="radio"
                        id="check-payments"
                        name="radio-group"
                      />
                      <label htmlFor="check-payments">Check Payments</label>
                    </p> */}
                  </div>
                  {order && !order.isPaid && paymentMethod === "PayPal" && (
                    <PayPalButton
                      // className="paypal"
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                    // <>
                    //   {!sdkReady ? (
                    //     <div>Loading!!</div>
                    //   ) : (
                    //     <PayPalButton
                    //       // amount={order.totalPrice}
                    //       onSuccess={successPaymentHandler}
                    //     />
                    //   )}
                    // </>

                    // <button>Paypal</button>
                  )}

                  {/* {order && !order.isPaid && ( */}
                    <button
                      type="submit"
                      className="default-btn"
                      style={{ cursor: "pointer" }}
                    >
                      Place Order
                    </button>
                  {/* )} */}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CheckoutArea;
