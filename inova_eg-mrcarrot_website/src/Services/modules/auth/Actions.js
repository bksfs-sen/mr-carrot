import Types from "./Types";

export const preRegisterSuccess = (payload) => ({
  type: Types.PRE_REGISTER_SUCCESS,
  payload,
});
export const authLoading = (payload) => ({
  type: Types.AUTH_LOADING,
  payload,
});

export const signinSuccess = (payload) => ({
  type: Types.SIGN_IN_SUCCESS,
  payload,
});
export const signinLoading = (payload) => ({
  type: Types.SIGN_IN_LOADING,
  payload,
});

export const signupSuccess = (payload) => ({
  type: Types.SIGN_UP_SUCCESS,
  payload,
});

export const signupFail = () => ({
  type: Types.SIGN_UP_FAIL,
});

export const signupLoading = (payload) => ({
  type: Types.SIGN_UP_LOADING,
  payload,
});

export const verifySuccess = (payload) => ({
  type: Types.VERIFY_SUCCESS,
  payload,
});
export const verifyLoading = (payload) => ({
  type: Types.VERIFY_LOADING,
  payload,
});

export const forgotPasswordOTPLoading = (payload) => ({
  type: Types.FORGOT_PASSWORD_OTP_LOADING,
  payload,
});

export const forgotPasswordOTPSuccess = (payload) => ({
  type: Types.FORGOT_PASSWORD_OTP_SUCCESS,
  payload,
});

export const forgotPasswordOTPFail = () => ({
  type: Types.FORGOT_PASSWORD_OTP_FAIL,
});

export const resetPasswordVerifyLoading = (payload) => ({
  type: Types.RESET_PASSWORD_VERIFY_LOADING,
  payload,
});

export const resetPasswordVerifySuccess = (payload) => ({
  type: Types.RESET_PASSWORD_VERIFY_SUCCESS,
  payload,
});

export const resetPasswordVerifyFail = () => ({
  type: Types.RESET_PASSWORD_VERIFY_FAIL,
});

export const changePasswordLoading = (payload) => ({
  type: Types.RESET_PASSWORD_VERIFY_LOADING,
  payload,
});

export const changePasswordSuccess = (payload) => ({
  type: Types.RESET_PASSWORD_VERIFY_SUCCESS,
  payload,
});

export const changePasswordFail = () => ({
  type: Types.RESET_PASSWORD_VERIFY_FAIL,
});
////////////////////////////////////
export const getUserExistanceFail = () => ({
  type: Types.GET_USER_EXISTENCE_FAIL,
});
export const getUserExistanceSuccess = (payload) => ({
  type: Types.GET_USER_EXISTENCE_SUCCESS,
  payload,
});
export const getUserExistanceLoading = (payload) => ({
  type: Types.GET_USER_EXISTENCE_LOADING,
  payload,
});
export const setFirebaseToken = (payload) => ({
  type: Types.SET_FIREBASE_TOKEN,
  payload,
});
