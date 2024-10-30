import Types from "./Types";

const INIT_STATE = {
  order: null,
  historicalOrders: [],
  currentOrders: [],
  load: {
    type: "",
    isLoading: false,
  },
};

export default function ordersReducer(state = INIT_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case Types.ADD_ORDER_SUCCESS: {
      // console.log(payload);
      return {
        ...state,
        order: payload?.order,
      };
    }

    case Types.ADD_ORDER_LOADING: {
      return {
        ...state,
        load: payload,
      };
    }
    case Types.ADD_APPLICANT_TO_ORDER_SUCCESS: {
      // console.log(payload);
      return {
        ...state,
        order: payload?.order,
      };
    }

    case Types.ADD_APPLICANT_TO_ORDER_LOADING: {
      return {
        ...state,
        load: payload,
      };
    }
    case Types.UPDATE_APPLICANT_IN_ORDER_SUCCESS: {
      return {
        ...state,
        order: payload?.order,
      };
    }

    case Types.UPDATE_APPLICANT_IN_ORDER_LOADING: {
      return {
        ...state,
        load: payload,
      };
    }
    case Types.REMOVE_APPLICANT_FROM_ORDER_SUCCESS: {
      return {
        ...state,
        order: payload?.order,
      };
    }

    case Types.REMOVE_APPLICANT_FROM_ORDER_LOADING: {
      return {
        ...state,
        load: payload,
      };
    }

    case Types.GET_ORDER_SUCCESS: {
      return {
        ...state,
        order: payload?.order,
      };
    }

    case Types.GET_ORDER_LOADING: {
      return {
        ...state,
        load: payload,
      };
    }
    case Types.CHECKOUT_SUCCESS: {
      //Set order to null (no order) / cart is empty
      return {
        ...state,
        order: null,
      };
    }

    case Types.CHECKOUT_LOADING: {
      return {
        ...state,
        load: payload,
      };
    }
    case Types.HISTORICAL_ORDERS_SUCCESS: {
      return {
        ...state,
        historicalOrders: payload.orders,
      };
    }
    case Types.HISTORICAL_ORDERS_LOADING: {
      return {
        ...state,
        load: payload,
      };
    }
    case Types.GET_CURRENT_ORDERS_SUCCESS: {
      return {
        ...state,
        currentOrders: payload.orders,
      };
    }
    case Types.GET_CURRENT_ORDERS_LOADIONG: {
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
