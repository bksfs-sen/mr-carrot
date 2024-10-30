import { contactusLoading, contactusSuccess } from "./Actions";

import { BaseURL } from "../../utils/constant";
import axios from "axios";
import handleErrors from "../../utils/HandelError";

export const contactusRequest = (formData) => async (dispatch) => {
  dispatch(contactusLoading({ type: "contact", isLoading: true }));
  try {
    const { data } = await axios.post(`${BaseURL}/contact-us`, formData);
    dispatch(contactusSuccess(data));
  } catch (error) {
    handleErrors(error);
  } finally {
    dispatch(contactusLoading({ type: "contact", isLoading: false }));
  }
};
