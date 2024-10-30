import {
  listPackagesLoading,
  listPackagesSuccess,
  setPaymentInfoLoading,
  setPaymentInfoSuccess,
} from "./Actions";

import { BaseURL } from "../../utils/constant";
import axios from "axios";
import handleErrors from "../../utils/HandelError";

export const setPaymentInfoRequest = (body) => async (dispatch) => {
  dispatch(setPaymentInfoLoading({ type: "payment", isLoading: true }));
  try {
    const { data } = await axios.post(`${BaseURL}/payments`, body);
    dispatch(setPaymentInfoSuccess(data));
  } catch (error) {
    handleErrors(error);
  } finally {
    dispatch(setPaymentInfoLoading({ type: "payment", isLoading: false }));
  }
};
