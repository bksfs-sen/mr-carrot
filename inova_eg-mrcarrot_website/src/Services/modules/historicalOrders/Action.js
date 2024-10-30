import Types from "./Types";

/*-------------------------------Action creators------------------------------*/
export const ordersLoading = (payload) => ({
  type: Types.ORDERS_LOADING,
  payload,
});
export const getOrdersSuccess = (payload) => ({
  type: Types.GET_ORDERS_SUCCESS,
  payload,
});

export const rateOrderLoading = (payload) => ({
  type: Types.RATE_ORDER_LOADING,
  payload,
});
export const rateOrderSuccess = (payload) => ({
  type: Types.RATE_ORDER_SUCCESS,
  payload,
});
