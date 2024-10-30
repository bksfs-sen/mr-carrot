import Types from "./Types";
/*-------------------------------Action creators------------------------------*/
export const notificationsLoading = (payload) => ({
  type: Types.NOTIFICATIONS_LOADING,
  payload,
});
export const getNotificationsSuccess = (payload) => ({
  type: Types.GET_NOTIFICATIONS_SUCCESS,
  payload,
});
export const getPaginationSuccess = (payload) => ({
  type: Types.GET_PAGINATION_SUCCESS,
  payload,
});
export const getPaginationLoading = (payload) => ({
  type: Types.GET_PAGINATION_LOADING,
  payload,
});
