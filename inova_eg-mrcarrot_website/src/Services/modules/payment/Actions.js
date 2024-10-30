import Types from "./Types";

export const setPaymentInfoSuccess = (payload) => ({
  type: Types.SET_PAYMENT_INFO_SUCCESS,
  payload,
});
export const setPaymentInfoLoading = (payload) => ({
  type: Types.SET_PAYMENT_INFO_LOADING,
  payload,
});
