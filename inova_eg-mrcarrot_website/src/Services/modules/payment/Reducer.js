import Types from "./Types";

const INIT_STATE = {
  payment: null,
  load: {
    type: "",
    isLoading: false,
  },
};

export default function paymentReducer(state = INIT_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case Types.SET_PAYMENT_INFO_SUCCESS: {
      return {
        ...state,
        payment: payload,
      };
    }

    case Types.SET_PAYMENT_INFO_LOADING: {
      return {
        ...state,
        load: payload,
      };
    }
    default: {
      return state;
    }
  }
}
