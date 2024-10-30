import { listPackagesLoading, listPackagesSuccess } from "./Actions";

import { BaseURL } from "../../utils/constant";
import axios from "axios";
import handleErrors from "../../utils/HandelError";

export const listPackagesRequest = () => async (dispatch) => {
  dispatch(listPackagesLoading({ type: "contact", isLoading: true }));
  try {
    const { data } = await axios.get(`${BaseURL}/packages`);
    dispatch(listPackagesSuccess(data));
  } catch (error) {
    handleErrors(error);
  } finally {
    dispatch(listPackagesLoading({ type: "contact", isLoading: false }));
  }
};
