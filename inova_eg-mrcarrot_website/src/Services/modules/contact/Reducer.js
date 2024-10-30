import Types from "./Types";

const INIT_STATE = {
  load: {
    type: "",
    isLoading: false,
  },
};

export default function contactReducer(state = INIT_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case Types.CONTACT_US_SUCCESS: {
      return {
        ...state,
      };
    }

    case Types.CONTACT_US_LOADING: {
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
