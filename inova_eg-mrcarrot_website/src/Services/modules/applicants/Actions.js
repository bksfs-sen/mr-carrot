import Types from "./Types";

//GET ALL APPLICANTS
export const listApplicantsSuccess = (payload) => ({
  type: Types.LIST_APPLICANTS_SUCCESS,
  payload,
});
export const listApplicantsLoading = (payload) => ({
  type: Types.LIST_APPLICANTS_LOADING,
  payload,
});
//DELETE APPLICANT
export const deleteApplicantSuccess = (payload) => ({
  type: Types.DELETE_APPLICANT_SUCCESS,
  payload,
});
export const deleteApplicantLoading = (payload) => ({
  type: Types.DELETE_APPLICANT_LOADING,
  payload,
});
//ADD APPLICANT
export const addApplicantSuccess = (payload) => ({
  type: Types.ADD_APPLICANT_SUCCESS,
  payload,
});
export const addApplicantLoading = (payload) => ({
  type: Types.ADD_APPLICANT_LOADING,
  payload,
});
//EDIT APPLICANT
export const editApplicantSuccess = (payload) => ({
  type: Types.EDIT_APPLICANT_SUCCESS,
  payload,
});
export const editApplicantLoading = (payload) => ({
  type: Types.EDIT_APPLICAT_LOADING,
  payload,
});
//SCHOOL NAMES
export const listSchoolNamesSuccess = (payload) => ({
  type: Types.LIST_SCHOOL_NAMES_SUCCESS,
  payload,
});
export const listSchoolNamesLoading = (payload) => ({
  type: Types.LIST_SCHOOL_NAMES_LOADING,
  payload,
});
//EDUCATIONAL LEVELS
export const listEducationalLevelsSuccess = (payload) => ({
  type: Types.LIST_EDUCATIONAL_LEVELS_SUCCESS,
  payload,
});
export const listEducationalLevelsLoading = (payload) => ({
  type: Types.LIST_EDUCATIONAL_LEVELS_LOADING,
  payload,
});
//HEALTH ISSUES
export const listHealthIssuesSuccess = (payload) => ({
  type: Types.LIST_HEALTH_ISSUES_SUCCESS,
  payload,
});
export const listHealthIssuesLoading = (payload) => ({
  type: Types.LIST_HEALTH_ISSUES_LOADING,
  payload,
});

//GET APPLICANT
export const getApplicantSuccess = (payload) => ({
  type: Types.GET_APPLICANT_SUCCESS,
  payload,
});

export const getApplicantLoading = (payload) => ({
  type: Types.GET_APPLICANT_LOADING,
  payload,
});
