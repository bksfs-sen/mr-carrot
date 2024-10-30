import {
  authLoading,
  changePasswordFail,
  changePasswordLoading,
  changePasswordSuccess,
  forgotPasswordOTPFail,
  forgotPasswordOTPSuccess,
  getUserExistanceFail,
  getUserExistanceLoading,
  getUserExistanceSuccess,
  preRegisterSuccess,
  resetPasswordVerifyFail,
  resetPasswordVerifyLoading,
  resetPasswordVerifySuccess,
  signinLoading,
  signinSuccess,
  signupFail,
  signupLoading,
  signupSuccess,
  verifyLoading,
  verifySuccess,
} from "./Actions";

import { BaseURL } from "../../utils/constant";
import axios from "axios";
import handleErrors from "../../utils/HandelError";
import { toast } from "react-toastify";

export const preRegisterRequest = (formData) => async (dispatch) => {
  dispatch(authLoading({ type: "auth", isLoading: true }));
  try {
    const { data } = await axios.post(
      `${BaseURL}/pre_registered_users`,
      formData
    );
    dispatch(preRegisterSuccess(data));
  } catch (error) {
    handleErrors(error);
  } finally {
    dispatch(authLoading({ type: "auth", isLoading: false }));
  }
};

export const signinRequest = (formData) => async (dispatch) => {
  dispatch(signinLoading({ type: "auth", isLoading: true }));
  try {
    const { data } = await axios.post(`${BaseURL}/sessions`, formData);
    dispatch(signinSuccess(data));
    window.location.assign("/");
  } catch (error) {
    handleErrors(error);
  } finally {
    dispatch(signinLoading({ type: "auth", isLoading: false }));
  }
};

export const signupRequest = (formData, actions) => async (dispatch) => {
  dispatch(signupLoading({ type: "auth", isLoading: true }));
  const token = localStorage.getItem("TOKEN");
  try {
    const { data } = await axios.post(`${BaseURL}/users`, formData);
    dispatch(signupSuccess(data));
    actions();
    // toast.success("Account created successfully");
    // window.location.assign("/verify");
  } catch (error) {
    dispatch(signupFail());
    console.log(error);
    handleErrors(error);
  } finally {
    dispatch(signupLoading({ type: "auth", isLoading: false }));
  }
};

export const verifyRequest = () => async (dispatch) => {
  const token = localStorage.getItem("TOKEN");
  dispatch(verifyLoading({ type: "auth", isLoading: true }));
  try {
    const { data } = await axios.post(`${BaseURL}/verify-user-firebase`);
    dispatch(verifySuccess(data));
    if (token) {
      toast.success("Account Data Updated Successfully.");
      window.location.replace("/");
    } else {
      toast.success("Account created Successfully.");
      window.location.replace("/signin");
    }
  } catch (error) {
    handleErrors(error);
  } finally {
    dispatch(verifyLoading({ type: "auth", isLoading: false }));
  }
};

export const forgotPasswordOTPRequest = (formData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${BaseURL}/forgot-password-send-otp`,
      formData
    );
    dispatch(forgotPasswordOTPSuccess(data));
  } catch (error) {
    dispatch(forgotPasswordOTPFail());
    handleErrors(error);
  }
};

export const resetPasswordVerifyRequest = (formData) => async (dispatch) => {
  dispatch(resetPasswordVerifyLoading({ type: "auth", isLoading: true }));
  try {
    const { data } = await axios.post(
      `${BaseURL}/check-verification`,
      formData
    );
    dispatch(resetPasswordVerifySuccess(data));
  } catch (error) {
    dispatch(resetPasswordVerifyFail());
    handleErrors(error);
  } finally {
    dispatch(resetPasswordVerifyLoading({ type: "auth", isLoading: false }));
  }
};
///////////////
export const getUserExistanceRequest =
  (phone_number, actions) => async (dispatch) => {
    dispatch(getUserExistanceLoading({ type: "exist", isLoading: true }));
    try {
      const { data } = await axios.get(`${BaseURL}/check-if-phone-exists`, {
        params: {
          phone_number: phone_number,
        },
      });
      actions();
      console.log(data);
      dispatch(getUserExistanceSuccess(data));
    } catch (error) {
      dispatch(getUserExistanceFail());
      handleErrors(error);
    } finally {
      dispatch(getUserExistanceLoading({ type: "", isLoading: false }));
    }
  };
//updated
export const changePasswordRequest = (formData) => async (dispatch) => {
  dispatch(changePasswordLoading({ type: "auth", isLoading: true }));
  try {
    const { data } = await axios.put(`${BaseURL}/update-password`, formData);
    dispatch(changePasswordSuccess(data));
  } catch (error) {
    dispatch(changePasswordFail());
    handleErrors(error);
  } finally {
    dispatch(changePasswordLoading({ type: "auth", isLoading: false }));
  }
};
