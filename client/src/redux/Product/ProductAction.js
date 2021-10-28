import axios from "axios";

import { PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_RESET, PRODUCT_LIST, PRODUCT_ERROR } from "./ProductTypes";


export const listProducts = (keyword='', pageNumber = '') => async (dispatch) => {
    try {
      const { data } = await axios.get(`/products?keyword=${keyword}&pageNumber=${pageNumber}`);

      dispatch({
        type: PRODUCT_LIST,
        payload: data,
      });
      
    } catch (error) {
  
      dispatch({
        type: PRODUCT_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const createProduct = (product) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });

    // const {
    //   userLogin: { userInfo },
    // } = getState();

    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${userInfo.token}`,
    //   },
    // };

    // passing second Argument an Empty Object, as we are not passing data here
    const { data } = await axios.post(`/products/add-product`, product);

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
