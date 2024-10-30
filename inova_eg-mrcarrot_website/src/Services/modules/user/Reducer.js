import Types from "./Types";

const INIT_STATE = {
  user: {},
  load: {
    type: "",
    isLoading: false,
  },
};

export default function userReducer(state = INIT_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case Types.EDIT_USER_SUCCESS: {
      return {
        ...state,
        user: payload.user,
      };
    }
    case Types.GET_USER_SUCCESS: {
      return {
        ...state,
        user: payload.user,
      };
    }
    case Types.USER_LOADING: {
      return {
        ...state,
        load: payload,
      };
    }
    default: {
      return state;
    }
  }
}
