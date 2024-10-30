import axios from "axios";
import { editUserSuccess, getUserSuccess, userLoading } from "./Actions";
import { BaseURL } from "../../utils/constant";
import handleErrors from "../../utils/HandelError";
import { toast } from "react-toastify";

export const getUserRequest = (id) => async (dispatch) => {
  dispatch(userLoading({ type: "user", isLoading: true }));
  try {
    const { data } = await axios.get(`${BaseURL}/users/${id}`);
    dispatch(getUserSuccess(data));
  } catch (error) {
    handleErrors(error);
  } finally {
    dispatch(userLoading({ type: "", isLoading: false }));
  }
};

export const editUserRequest = (formData, id, action) => async (dispatch) => {
  dispatch(userLoading({ type: "user", isLoading: true }));
  try {
    const { data } = await axios.put(`${BaseURL}/users/${id}`, formData);
    dispatch(editUserSuccess(data));
    action();
  } catch (error) {
    handleErrors(error);
  } finally {
    dispatch(userLoading({ type: "", isLoading: false }));
  }
};
