import Types from "./Types";

const INIT_STATE = {
  historicalOrders: [],
  load: {
    type: "",
    isLoading: false,
  },
};

export default function historicalOrderReducer(state = INIT_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case Types.GET_ORDERS_SUCCESS: {
      return {
        ...state,
        historicalOrders: payload,
      };
    }
    case Types.ORDERS_LOADING: {
      return {
        ...state,
        load: payload,
      };
    }
    case Types.RATE_ORDER_SUCCESS: {
      return {
        ...state,
      };
    }
    case Types.RATE_ORDER_LOADING: {
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
