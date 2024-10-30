import Types from "./Types";

export const addOrderSuccess = (payload) => ({
  type: Types.ADD_ORDER_SUCCESS,
  payload,
});
export const addOrderLoading = (payload) => ({
  type: Types.ADD_ORDER_LOADING,
  payload,
});
//ADD APPLICANT
export const addApplicantToOrderSuccess = (payload) => ({
  type: Types.ADD_APPLICANT_TO_ORDER_SUCCESS,
  payload,
});
export const addApplicantToOrderLoading = (payload) => ({
  type: Types.ADD_APPLICANT_TO_ORDER_LOADING,
  payload,
});

//REMOVE APPLICANT
export const removeApplicantFromOrderSuccess = (payload) => ({
  type: Types.REMOVE_APPLICANT_FROM_ORDER_SUCCESS,
  payload,
});
export const removeApplicantFromOrderLoading = (payload) => ({
  type: Types.REMOVE_APPLICANT_FROM_ORDER_LOADING,
  payload,
});

//UPDATE APPLICANT
export const updateApplicantInOrderSuccess = (payload) => ({
  type: Types.UPDATE_APPLICANT_IN_ORDER_SUCCESS,
  payload,
});
export const updateApplicantInOrderLoading = (payload) => ({
  type: Types.UPDATE_APPLICANT_IN_ORDER_LOADING,
  payload,
});

//GET ORDER
export const getOrderSuccess = (payload) => ({
  type: Types.GET_ORDER_SUCCESS,
  payload,
});
export const getOrderLoading = (payload) => ({
  type: Types.GET_ORDER_LOADING,
  payload,
});

export const checkoutSuccess = (payload) => ({
  type: Types.CHECKOUT_SUCCESS,
  payload,
});
export const checkoutLoading = (payload) => ({
  type: Types.CHECKOUT_LOADING,
  payload,
});
//get historical orders
export const historicalOrdersLoading = (payload) => ({
  type: Types.HISTORICAL_ORDERS_LOADING,
  payload,
});
export const getHistoricalOrdersSuccess = (payload) => ({
  type: Types.HISTORICAL_ORDERS_SUCCESS,
  payload,
});

//GET CURRENT ORDERS
export const getCurrentOrdersSucces = (payload) => ({
  type: Types.GET_CURRENT_ORDERS_SUCCESS,
  payload,
});
export const getCurrentOrdersLoading = (payload) => ({
  type: Types.GET_CURRENT_ORDERS_LOADIONG,
  payload,
});
