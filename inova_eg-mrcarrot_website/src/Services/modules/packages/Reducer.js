import Types from "./Types";

const INIT_STATE = {
  packages: null,
  load: {
    type: "",
    isLoading: false,
  },
};

export default function packagesReducer(state = INIT_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case Types.LIST_PACKAGES_SUCCESS: {
      return {
        ...state,
        packages: payload,
      };
    }

    case Types.LIST_PACKAGES_LOADING: {
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
