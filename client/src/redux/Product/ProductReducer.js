import { PRODUCT_LIST, PRODUCT_ERROR } from "./ProductTypes";
import { PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_RESET } from "./ProductTypes";


const initialState = {
  products: [],
  error: {},
};

export const productReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCT_LIST:
      return {
        ...state,
        products: [...payload.products],
        pages: payload.pages,
        page: payload.page,
      };

    case PRODUCT_ERROR:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};