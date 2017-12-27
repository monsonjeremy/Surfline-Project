import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_FAILURE,
  LOG_OUT_SUCCESS
} from './actions';

const Authentication = (
  state = {
    user: null,
    loggedIn: false,
  },
  action
) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return {
        ...state,
        loginLoading: true,
        loginRequested: true,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        user: action.user,
        loggedIn: action.loggedIn,
        loginLoading: false,
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        user: null,
        loggedIn: false,
        loginRequested: false,
        loginLoading: false,
        error: action.errMsg,
      };
    case LOG_OUT_REQUEST:
      return {
        ...state,
        logoutRequested: true,
        logoutLoading: true,
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        logoutRequested: false,
        logoutLoading: false,
        error: action.errMsg,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        logoutRequested: false,
        logoutLoading: false,
        user: null,
        loggedIn: false,
      };
    default:
      return state;
  }
};

export default Authentication;
