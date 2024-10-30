import Types from "./Types";

export const listPackagesSuccess = (payload) => ({
  type: Types.LIST_PACKAGES_SUCCESS,
  payload,
});
export const listPackagesLoading = (payload) => ({
  type: Types.LIST_PACKAGES_LOADING,
  payload,
});
