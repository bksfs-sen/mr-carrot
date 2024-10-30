import Types from "./Types";

export const getOfficialVacationsSuccess = (payload) => ({
  type: Types.GET_OFFICIAL_VACATIONS_SUCCESS,
  payload,
});
export const getOfficialVacationsLoading = (payload) => ({
  type: Types.GET_OFFICIAL_VACATIONS_LOADING,
  payload,
});
export const createApplicantVacationSuccess = (payload) => ({
  type: Types.CREATE_APPLICANT_VACATION_SUCCESS,
  payload,
});
export const createApplicantVacationLoading = (payload) => ({
  type: Types.CREATE_APPLICANT_VACATION_LOADING,
  payload,
});
