import axios from "axios";
import {
  PASSWORD_RESET_SUCCESS,
  PASSWORD_ERROR,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
} from "./PasswordTypes";

export const passwordReset = (user) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`user/passwordreset`, user, config);

    dispatch({
      type: PASSWORD_RESET_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: PASSWORD_ERROR,
      payload: message,
    });
  }
};

// Update User Profile
export const updateUserProfile = (id, user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    // const {
    //   userLogin: { userInfo },
    // } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/user/${id}`, user, config);

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
