import Types from "./Types";
/*-------------------------------Action creators------------------------------*/
//load user data
export const userLoading = (payload) => ({
  //return an action , each action must have a type property, optionally a payload=> payload is the fetched data
  type: Types.USER_LOADING,
  payload,
});
//get user data
export const getUserSuccess = (payload) => ({
  type: Types.GET_USER_SUCCESS,
  payload,
});
//edit user data success
export const editUserSuccess = (payload) => ({
  type: Types.EDIT_USER_SUCCESS,
  payload,
});
