import axios from "axios";
import {
  getNotificationsMenuSuccess,
  getNotificationsSuccess,
  getPaginationLoading,
  getPaginationSuccess,
  notificationsLoading,
} from "./Actions";
import { BaseURL } from "../../utils/constant";
import handleErrors from "../../utils/HandelError";

export const getNotificationsRequest =
  (page_number, page_size) => async (dispatch) => {
    dispatch(notificationsLoading({ type: "notification", isLoading: true }));
    try {
      const { data } = await axios.get(`${BaseURL}/notifications`, {
        params: {
          page_number: page_number,
          page_size: page_size,
        },
      });

      dispatch(getNotificationsSuccess(data));
    } catch (error) {
      handleErrors(error);
    } finally {
      dispatch(notificationsLoading({ type: "", isLoading: false }));
    }
  };
export const getPaginationsRequest =
  (page_number, page_size) => async (dispatch) => {
    dispatch(getPaginationLoading({ type: "pagination", isLoading: true }));
    try {
      const { data } = await axios.get(`${BaseURL}/notifications`, {
        params: {
          page_number: page_number,
          page_size: page_size,
        },
      });
      dispatch(getPaginationSuccess(data));
    } catch (error) {
      handleErrors(error);
    } finally {
      dispatch(getPaginationLoading({ type: "", isLoading: false }));
    }
  };
