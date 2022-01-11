import {
  WISHLIST_CREATE_FAIL,
  WISHLIST_CREATE_REQUEST,
  WISHLIST_CREATE_RESET,
  WISHLIST_CREATE_SUCCESS,
  WISHLIST_DELETE_FAIL,
  WISHLIST_DELETE_REQUEST,
  WISHLIST_DELETE_SUCCESS,
  WISHLIST_LIST_MY_FAIL,
  WISHLIST_LIST_MY_REQUEST,
  WISHLIST_LIST_MY_RESET,
  WISHLIST_LIST_MY_SUCCESS,
} from "./WishlistTypes";

const initialState = {
  products: [],
  error: {},
};

export const wishlistCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case WISHLIST_CREATE_REQUEST:
      return { loading: true };
    case WISHLIST_CREATE_SUCCESS:
      return { loading: false, success: true, wishlist: action.payload };
    case WISHLIST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case WISHLIST_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const wishlistMyReducer = (state = { wishlists: [] }, action) => {
  switch (action.type) {
    case WISHLIST_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case WISHLIST_LIST_MY_SUCCESS:
      // console.log("WIsh in Reducer ", wishlists);
      return {
        loading: false,
        wishlists: action.payload,
      };
    case WISHLIST_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case WISHLIST_LIST_MY_RESET:
      return { wishlists: [] };
    default:
      return state;
  }
};

export const wishlistDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case WISHLIST_DELETE_REQUEST:
      return { loading: true };
    case WISHLIST_DELETE_SUCCESS:
      return { loading: false, success: true };
    case WISHLIST_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
