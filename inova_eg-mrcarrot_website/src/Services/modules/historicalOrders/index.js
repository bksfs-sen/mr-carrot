import {
  getOrdersSuccess,
  ordersLoading,
  rateOrderLoading,
  rateOrderSuccess,
} from "./Action";

import { BaseURL } from "../../utils/constant";
import axios from "axios";
import handleErrors from "../../utils/HandelError";

export const getOrdersRequest = () => async (dispatch) => {
  dispatch(ordersLoading({ type: "order", isLoading: true }));
  try {
    const { data } = await axios.get(`${BaseURL}/historical-orders`);
    dispatch(getOrdersSuccess(data));
  } catch (error) {
    handleErrors(error);
  } finally {
    dispatch(ordersLoading({ type: "", isLoading: false }));
  }
};

export const rateOrderRequest = (body) => async (dispatch) => {
  dispatch(rateOrderLoading({ type: "rate", isLoading: true }));

  try {
    const { data } = await axios.post(`${BaseURL}/reviews`, body);
    dispatch(rateOrderSuccess(data));
  } catch (error) {
    handleErrors(error);
  } finally {
    dispatch(rateOrderLoading({ type: "rate", isLoading: false }));
  }
};
