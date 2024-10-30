import {
  addApplicantToOrderLoading,
  addApplicantToOrderSuccess,
  addOrderLoading,
  addOrderSuccess,
  checkoutLoading,
  checkoutSuccess,
  getCurrentOrdersLoading,
  getCurrentOrdersSucces,
  getHistoricalOrdersSuccess,
  getOrderLoading,
  getOrderSuccess,
  historicalOrdersLoading,
  removeApplicantFromOrderLoading,
  removeApplicantFromOrderSuccess,
  updateApplicantInOrderLoading,
  updateApplicantInOrderSuccess,
} from "./Actions";

import { BaseURL } from "../../utils/constant";
import axios from "axios";
import handleErrors from "../../utils/HandelError";

//CREATE ORDER
export const addOrderRequest = (formData) => async (dispatch) => {
  dispatch(addOrderLoading({ type: "order", isLoading: true }));
  try {
    const { data } = await axios.post(`${BaseURL}/orders`, formData);
    dispatch(addOrderSuccess(data));
  } catch (error) {
    handleErrors(error);
  } finally {
    dispatch(addOrderLoading({ type: "", isLoading: false }));
  }
};
//ADD APPLICANT TO ORDER
export const addApplicantToOrderRequest = (formData) => async (dispatch) => {
  dispatch(addApplicantToOrderLoading({ type: "addOrder", isLoading: true }));
  try {
    const { data } = await axios.post(
      `${BaseURL}/add-sub-order-to-order`,
      formData
    );
    dispatch(addApplicantToOrderSuccess(data));
  } catch (error) {
    handleErrors(error);
  } finally {
    dispatch(addApplicantToOrderLoading({ type: "", isLoading: false }));
  }
};
//UPDATE APPLICANT IN ORDER
export const updateApplicantInOrderRequest = (formData) => async (dispatch) => {
  dispatch(
    updateApplicantInOrderLoading({ type: "UpdateOrder", isLoading: true })
  );
  try {
    const { data } = await axios.put(`${BaseURL}/update-sub-order`, formData);
    dispatch(updateApplicantInOrderSuccess(data));
  } catch (error) {
    handleErrors(error);
  } finally {
    dispatch(updateApplicantInOrderLoading({ type: "", isLoading: false }));
  }
};
//REMOVE APPLICANT FROM ORDER
export const removeApplicantFromOrderRequest = (id) => async (dispatch) => {
  dispatch(
    removeApplicantFromOrderLoading({ type: "removeOrder", isLoading: true })
  );

  try {
    const { data } = await axios.delete(
      `${BaseURL}/remove-sub-order-from-order/?sub_order_id=${id}`
    );
    dispatch(removeApplicantFromOrderSuccess(data));
  } catch (error) {
    handleErrors(error);
  } finally {
    dispatch(removeApplicantFromOrderLoading({ type: "", isLoading: false }));
  }
};

export const getOrderRequest = (action) => async (dispatch) => {
  dispatch(getOrderLoading({ type: "getOrder", isLoading: true }));
  try {
    const { data } = await axios.get(`${BaseURL}/get-pending-order`);
    action && action(data?.order);
    dispatch(getOrderSuccess(data));
  } catch (error) {
    handleErrors(error);
  } finally {
    dispatch(getOrderLoading({ type: "", isLoading: false }));
  }
};

export const checkoutRequest = (id) => async (dispatch) => {
  dispatch(checkoutLoading({ type: "checkOrder", isLoading: true }));
  try {
    const { data } = await axios.post(`${BaseURL}/orders/${id}/checkout`);
    dispatch(checkoutSuccess(data));
  } catch (error) {
    handleErrors(error);
  } finally {
    dispatch(checkoutLoading({ type: "", isLoading: false }));
  }
};
//get historical orders
export const getHistoricalOrdersRequest = () => async (dispatch) => {
  dispatch(
    historicalOrdersLoading({ type: "historicalOrder", isLoading: true })
  );
  try {
    const { data } = await axios.get(`${BaseURL}/historical-orders`);
    dispatch(getHistoricalOrdersSuccess(data));
  } catch (error) {
    handleErrors(error);
  } finally {
    dispatch(historicalOrdersLoading({ type: "", isLoading: false }));
  }
};

//GET CURRENT ORDERS
export const getCurrentOrdersRequest = () => async (dispatch) => {
  dispatch(getCurrentOrdersLoading({ type: "order", isLoading: true }));
  try {
    const { data } = await axios.get(`${BaseURL}/current-orders`);
    dispatch(getCurrentOrdersSucces(data));
  } catch (error) {
    handleErrors(error);
  } finally {
    dispatch(getCurrentOrdersLoading({ type: "", isLoading: false }));
  }
};
