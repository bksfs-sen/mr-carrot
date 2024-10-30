import {
  createApplicantVacationLoading,
  createApplicantVacationSuccess,
  getOfficialVacationsLoading,
  getOfficialVacationsSuccess,
} from "./Actions";

import { BaseURL } from "../../utils/constant";
import axios from "axios";
import handleErrors from "../../utils/HandelError";
import { toast } from "react-toastify";

export const getOfficialVacationsRequest = () => async (dispatch) => {
  dispatch(getOfficialVacationsLoading({ type: "user", isLoading: true }));
  try {
    const { data } = await axios.get(`${BaseURL}/official_vacations`);
    dispatch(getOfficialVacationsSuccess(data));
  } catch (error) {
    handleErrors(error);
  } finally {
    dispatch(getOfficialVacationsLoading({ type: "", isLoading: false }));
  }
};

export const createApplicantVacationRequest = (body) => async (dispatch) => {
  dispatch(createApplicantVacationLoading({ type: "user", isLoading: true }));
  try {
    const { data } = await axios.post(`${BaseURL}/vacancies`, body);
    dispatch(createApplicantVacationSuccess(data));
  } catch (error) {
    handleErrors(error);
  } finally {
    dispatch(createApplicantVacationLoading({ type: "", isLoading: false }));
  }
};
