import Types from "./Types";

const INIT_STATE = {
  firebaseToken: "",
  account: {},
  load: {
    type: "",
    isLoading: false,
  },
  resetPasswordVerificationCode: "",
  error: null,
};

export default function authReducer(state = INIT_STATE, action) {
  const { type, payload } = action;
  // PRE-REGISTER
  switch (type) {
    case Types.PRE_REGISTER_SUCCESS: {
      return {
        ...state,
      };
    }

    case Types.AUTH_LOADING: {
      return {
        ...state,
        load: payload,
      };
    }
    // SIGN IN
    case Types.SIGN_IN_SUCCESS: {
      localStorage.setItem("TOKEN", payload?.user?.token);
      localStorage.setItem("USER_TYPE", "user");
      localStorage.setItem("USER_ID", payload?.user?.id);
      localStorage.setItem("IS_VERIFIED", payload?.user?.is_verified);
      return {
        ...state,
      };
    }

    case Types.SIGN_IN_LOADING: {
      return {
        ...state,
        load: payload,
      };
    }

    //SIGN UP
    case Types.SIGN_UP_SUCCESS: {
      // localStorage.setItem("TOKEN", payload?.user?.token);
      localStorage.setItem(
        "UNCONFIRMED_MOBILE_NUMBER",
        payload?.user?.unconfirmed_mobile_number
      );
      // localStorage.setItem(
      //   "CONFIRMATION_TOKEN",
      //   payload?.user?.confirmation_token
      // );
      localStorage.setItem("USER_TYPE", "user");
      localStorage.setItem("IS_VERIFIED", payload?.user?.is_verified);
      return {
        ...state,
        account: payload,
        error: null,
      };
    }
    case Types.SIGN_UP_FAIL: {
      return {
        ...state,
        error: true,
      };
    }
    case Types.SIGN_UP_LOADING: {
      return {
        ...state,
        load: payload,
      };
    }
    //firebase tokrn
    case Types.SET_FIREBASE_TOKEN: {
      return {
        ...state,
        firebaseToken: payload,
      };
    }
    //FORGOT PASSWORD OTP
    case Types.FORGOT_PASSWORD_OTP_SUCCESS: {
      localStorage.setItem("CONFIRMATION_TOKEN", payload);

      return {
        ...state,
        error: null,
      };
    }

    case Types.FORGOT_PASSWORD_OTP_FAIL: {
      return {
        ...state,
        error: true,
      };
    }
    ///////////////////////////////////
    case Types.GET_USER_EXISTENCE_SUCCESS: {
      return {
        ...state,
        error: false,
      };
    }
    case Types.GET_USER_EXISTENCE_FAIL: {
      return {
        ...state,
        error: true,
      };
    }
    case Types.GET_USER_EXISTENCE_LOADING: {
      return {
        ...state,
        load: payload,
      };
    }
    //////////////////////////////////////
    //RESET PASSWORD VERIFY
    case Types.RESET_PASSWORD_VERIFY_SUCCESS: {
      return {
        ...state,
        resetPasswordVerificationCode: payload,
        error: null,
      };
    }

    case Types.RESET_PASSWORD_VERIFY_FAIL: {
      return {
        ...state,
        error: true,
      };
    }
    case Types.RESET_PASSWORD_VERIFY_LOADING: {
      return {
        ...state,
        load: payload,
        error: null,
      };
    }

    //CHANGE PASSWORD
    case Types.CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        error: null,
      };
    }
    case Types.CHANGE_PASSWORD_FAIL: {
      return {
        ...state,
        error: true,
      };
    }
    case Types.CHANGE_PASSWORD_LOADING: {
      return {
        ...state,
        load: payload,
        error: null,
      };
    }
    default: {
      return state;
    }
  }
}
