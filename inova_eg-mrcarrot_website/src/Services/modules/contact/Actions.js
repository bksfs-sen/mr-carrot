import Types from "./Types";

export const contactusSuccess = (payload) => ({
  type: Types.CONTACT_US_SUCCESS,
  payload,
});
export const contactusLoading = (payload) => ({
  type: Types.CONTACT_US_LOADING,
  payload,
});
