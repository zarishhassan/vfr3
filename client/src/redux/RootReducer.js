import { combineReducers } from "redux";
import {productCreateReducer, productDetailReducer} from "./Product/ProductReducer";
import OrderReducer from "./Order/OrderReducer";
import PasswordReducer from "./ResetPassword/PasswordReducer";

export default combineReducers({
  productCreateReducer,
  OrderReducer,
  PasswordReducer,
  productDetailReducer
});
