import { PASSWORD_RESET_SUCCESS, PASSWORD_ERROR, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL } from "./PasswordTypes";

const initialState = {
  success: false,
};

const PasswordReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        message: payload
      };

    case PASSWORD_ERROR:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
};

const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export {PasswordReducer, userUpdateProfileReducer};
