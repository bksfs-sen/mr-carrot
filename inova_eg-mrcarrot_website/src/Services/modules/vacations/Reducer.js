import Types from "./Types";

const INIT_STATE = {
  officialVacations: null,
  load: {
    type: "vacations",
    isLoading: false,
  },
};

export default function vacationsReducer(state = INIT_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case Types.GET_OFFICIAL_VACATIONS_SUCCESS: {
      return {
        ...state,
        officialVacations: payload.official_vacations,
      };
    }
    case Types.GET_OFFICIAL_VACATIONS_LOADING: {
      return {
        ...state,
        load: payload,
      };
    }
    case Types.CREATE_APPLICANT_VACATION_SUCCESS: {
      return {
        ...state,
      };
    }
    case Types.CREATE_APPLICANT_VACATION_LOADING: {
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
