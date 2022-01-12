import axios from "axios";
import {
  WISHLIST_CREATE_FAIL,
  WISHLIST_CREATE_REQUEST,
  WISHLIST_CREATE_SUCCESS,
  WISHLIST_DELETE_FAIL,
  WISHLIST_DELETE_REQUEST,
  WISHLIST_DELETE_SUCCESS,
  WISHLIST_LIST_MY_FAIL,
  WISHLIST_LIST_MY_REQUEST,
  WISHLIST_LIST_MY_SUCCESS,
} from "./WishlistTypes";

// Create a New Conversation
export const createWishlist =
  ({ product, user }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: WISHLIST_CREATE_REQUEST,
      });

      const { data } = await axios.post(`/wishlist`, { product, user });

      dispatch({
        type: WISHLIST_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: WISHLIST_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listMyWishlist = () => async (dispatch) => {
  try {
    dispatch({
      type: WISHLIST_LIST_MY_REQUEST,
    });

    // console.log("User ID in Action ", user);

    const { data } = await axios.get("/wishlist");

    dispatch({
      type: WISHLIST_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    // if (message === "Not authorized, token failed") {
    //   dispatch(logout());
    // }
    dispatch({
      type: WISHLIST_LIST_MY_FAIL,
      payload: message,
    });
  }
};

export const deleteWishlist = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: WISHLIST_DELETE_REQUEST,
    });

    console.log('productId in action ', productId)
    await axios.delete("/wishlist", productId);

    dispatch({
      type: WISHLIST_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    // if (message === "Not authorized, token failed") {
    //   dispatch(logout());
    // }
    dispatch({
      type: WISHLIST_DELETE_FAIL,
      payload: message,
    });
  }
};
