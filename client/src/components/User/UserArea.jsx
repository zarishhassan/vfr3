import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../../redux/Order/OrderAction";
import { withRouter } from "react-router-dom";

function UserArea({ user, history }) {
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.OrderReducer);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch, orderId]);

  let userOrders = [];

  if (orders && orders.length > 0) {
    orders.map((order) => {
      if (order.userId === user._id) {
        userOrders.push(order);
      }
    });
  }

  const handleSubmit = (e) => {
    // e.preventDefault();
    history.push(`/updateProfile/${e}`);
    console.log("Clicked ", e);
  }

  return (
    <>
      {/* <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            ref={name}
          />
        </div>
      </form> */}
      <div className="user-area-wrap ptb-100 container">
        <h4 className="user-header">User Profile</h4>

        <div className="user-info">
          <table className="table m-0">
            <tbody>
              <tr>
                <th scope="row">Name:</th>
                <td>{user.name}</td>
              </tr>
              <tr>
                <th scope="row">Email:</th>
                <td>{user.email}</td>
              </tr>
              <tr>
                <th scope="row">Phone:</th>
                <td>{user.phone}</td>
              </tr>
              <tr>
                <th scope="row">Role:</th>
                <td>{user.role}</td>
              </tr>
            </tbody>
          </table>

          {/* <form onSubmit={handleSubmit}> */}
            <button onClick={() => handleSubmit(user._id)}>Edit Profile</button>
          {/* </form> */}

          {/* {user.role === "user" &&
        (user.orders.length <= 0 ? (
            <p><span className="user-border">No orders </span></p>
        ) : (
            user.orders.map((order) => {
            return <li key={order}>{order}</li>;
            })
        ))} */}
        </div>
      </div>
      {user.role === "user" && 
      (
      <div className="container">
        <h4 className="user-header">User Orders</h4>
        <table className="order_list_table">
          <thead>
            <tr className="order_table100_head">
              <th className="order_column1">Id</th>
              <th className="order_column2">User</th>
              <th className="order_column4">Total</th>
              <th className="order_column5">Paid</th>
              <th className="order_column6">Status</th>
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody>
            {userOrders.length > 0 ? (
              userOrders.map((order) => (
                <tr key={order._id}>
                  <td className="order_column1">{order._id}</td>
                  <td className="order_column2">{order.user_first_name}</td>
                  <td className="order_column4">${order.totalPrice}</td>
                  <td className="order_column5">
                    {order.isPaid === false ? "Not Paid" : "Paid"}
                  </td>
                  <td className="order_column6">
                    {order.isDelivered === false
                      ? "Not Delivered"
                      : "Delivered"}
                  </td>
                </tr>

                // <>
                //   <div>
                //     <h2 key={order._id}>{order.user_first_name}</h2>
                //   </div>
                // </>
              ))
            ) : (
              <p>
                <span className="user-border">No orders </span>
              </p>
            )}
          </tbody>
        </table>
      </div>
      )}
    </>
  );
}

export default withRouter(UserArea);
