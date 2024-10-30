import Types from "./Types";

const INIT_STATE = {
  notifications: [],
  pagination: [],
  load: {
    type: "",
    isLoading: false,
  },
};

export default function notificationsReducer(state = INIT_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case Types.GET_NOTIFICATIONS_SUCCESS: {
      return {
        ...state,
        notifications: payload.notifications,
      };
    }
    case Types.GET_PAGINATION_SUCCESS: {
      return {
        ...state,
        pagination: [...state.pagination, ...payload.notifications],
      };
    }
    case Types.GET_PAGINATION_LOADING: {
      return {
        ...state,
        load: payload,
      };
    }
    case Types.NOTIFICATIONS_LOADING: {
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
