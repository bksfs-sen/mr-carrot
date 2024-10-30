import Types from "./Types";

const INIT_STATE = {
  healthIssues: null,
  schools: null,
  educationalLevels: null,
  applicants: null,
  load: {
    type: "",
    isLoading: false,
  },
  applicant: null,
  error: null,
};

export default function applicantReducer(state = INIT_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case Types.LIST_APPLICANTS_SUCCESS: {
      return {
        ...state,
        applicants: payload,
      };
    }

    case Types.LIST_APPLICANTS_LOADING: {
      return {
        ...state,
        load: payload,
      };
    }
    case Types.DELETE_APPLICANT_SUCCESS: {
      return {
        ...state,
      };
    }

    case Types.DELETE_APPLICANT_LOADING: {
      return {
        ...state,
        load: payload,
      };
    }

    case Types.ADD_APPLICANT_SUCCESS: {
      return {
        ...state,
      };
    }

    case Types.ADD_APPLICANT_LOADING: {
      return {
        ...state,
        load: payload,
      };
    }
    case Types.LIST_SCHOOL_NAMES_SUCCESS: {
      return {
        ...state,
        schools: payload,
      };
    }

    case Types.LIST_SCHOOL_NAMES_LOADING: {
      return {
        ...state,
        load: payload,
      };
    }
    case Types.LIST_EDUCATIONAL_LEVELS_SUCCESS: {
      return {
        ...state,
        educationalLevels: payload,
      };
    }

    case Types.LIST_EDUCATIONAL_LEVELS_LOADING: {
      return {
        ...state,
        load: payload,
      };
    }
    case Types.LIST_HEALTH_ISSUES_SUCCESS: {
      return {
        ...state,
        healthIssues: payload,
      };
    }

    case Types.LIST_HEALTH_ISSUES_LOADING: {
      return {
        ...state,
        load: payload,
      };
    }

    case Types.EDIT_APPLICANT_SUCCESS: {
      return {
        ...state,
      };
    }
    case Types.EDIT_APPLICAT_LOADING: {
      return {
        ...state,
        load: payload,
      };
    }
    case Types.GET_APPLICANT_SUCCESS: {
      return {
        ...state,
        applicant: payload,
      };
    }
    case Types.GET_APPLICANT_LOADING: {
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
