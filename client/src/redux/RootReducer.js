import { combineReducers } from "redux";
import {
  productCreateReducer,
  productDetailReducer,
  productReducer,
  productUpdateReducer
} from "./Product/ProductReducer";
import OrderReducer from "./Order/OrderReducer";
import {
  PasswordReducer,
  userUpdateProfileReducer,
} from "./ResetPassword/PasswordReducer";

export default combineReducers({
  productCreateReducer,
  OrderReducer,
  PasswordReducer,
  productDetailReducer,
  productReducer,
  userUpdateProfileReducer,
  productUpdateReducer
});
