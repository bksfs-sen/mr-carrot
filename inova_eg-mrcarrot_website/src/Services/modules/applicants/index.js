import {
  addApplicantLoading,
  addApplicantSuccess,
  deleteApplicantLoading,
  deleteApplicantSuccess,
  editApplicantLoading,
  editApplicantSuccess,
  getApplicantLoading,
  getApplicantSuccess,
  listApplicantsLoading,
  listApplicantsSuccess,
  listEducationalLevelsLoading,
  listEducationalLevelsSuccess,
  listHealthIssuesLoading,
  listHealthIssuesSuccess,
  listSchoolNamesLoading,
  listSchoolNamesSuccess,
} from "./Actions";

import { BaseURL } from "../../utils/constant";
import axios from "axios";
import handleErrors from "../../utils/HandelError";
import { toast } from "react-toastify";

export const listApplicantsRequest = () => async (dispatch) => {
  dispatch(listApplicantsLoading({ type: "applicants", isLoading: true }));
  try {
    const { data } = await axios.get(`${BaseURL}/applicants`);
    dispatch(listApplicantsSuccess(data));
  } catch (error) {
    handleErrors(error);
  } finally {
    dispatch(listApplicantsLoading({ type: "applicants", isLoading: false }));
  }
};

export const deleteApplicantRequest = (id) => async (dispatch) => {
  dispatch(deleteApplicantLoading({ type: "applicants", isLoading: true }));
  try {
    const { data } = await axios.delete(`${BaseURL}/applicants/${id}`);
    dispatch(deleteApplicantSuccess(data));
  } catch (error) {
    handleErrors(error);
  } finally {
    dispatch(deleteApplicantLoading({ type: "applicants", isLoading: false }));
  }
};

export const addApplicantRequest = (formData) => async (dispatch) => {
  dispatch(addApplicantLoading({ type: "applicants", isLoading: true }));
  try {
    const { data } = await axios.post(`${BaseURL}/applicants`, formData);
    dispatch(addApplicantSuccess(data));
    toast.success("A new applicant has been added");
  } catch (error) {
    handleErrors(error);
  } finally {
    dispatch(addApplicantLoading({ type: "applicants", isLoading: false }));
  }
};

export const listSchoolsNamesRequest = () => async (dispatch) => {
  dispatch(listSchoolNamesLoading({ type: "applicants", isLoading: true }));
  try {
    const { data } = await axios.get(`${BaseURL}/schools`);
    dispatch(listSchoolNamesSuccess(data));
  } catch (error) {
    handleErrors(error);
  } finally {
    dispatch(listSchoolNamesLoading({ type: "applicants", isLoading: false }));
  }
};

export const listHealthIssuesRequest = () => async (dispatch) => {
  dispatch(listHealthIssuesLoading({ type: "applicants", isLoading: true }));
  try {
    const { data } = await axios.get(`${BaseURL}/medical_issues`);
    dispatch(listHealthIssuesSuccess(data));
  } catch (error) {
    handleErrors(error);
  } finally {
    dispatch(listHealthIssuesLoading({ type: "applicants", isLoading: false }));
  }
};

export const listEducationalLevelsRequest = () => async (dispatch) => {
  dispatch(
    listEducationalLevelsLoading({ type: "applicants", isLoading: true })
  );
  try {
    const { data } = await axios.get(`${BaseURL}/education-levels`);
    dispatch(listEducationalLevelsSuccess(data));
  } catch (error) {
    handleErrors(error);
  } finally {
    dispatch(
      listEducationalLevelsLoading({ type: "applicants", isLoading: false })
    );
  }
};

export const editApplicantRequest = (formData, id) => async (dispatch) => {
  dispatch(editApplicantLoading({ type: "applicants", isLoading: true }));
  try {
    const { data } = await axios.put(`${BaseURL}/applicants/${id}`, formData);
    dispatch(editApplicantSuccess(data));
    toast.success("Applicant data has been updatd successfully");
  } catch (error) {
    handleErrors(error);
  } finally {
    dispatch(editApplicantLoading({ type: "applicants", isLoading: false }));
  }
};

export const getApplicantRequest = (id) => async (dispatch) => {
  dispatch(getApplicantLoading({ type: "applicants", isLoading: true }));
  try {
    const { data } = await axios.get(`${BaseURL}/applicants/${id}`);
    dispatch(getApplicantSuccess(data));
  } catch (error) {
    handleErrors(error);
  } finally {
    dispatch(getApplicantLoading({ type: "applicants", isLoading: false }));
  }
};
