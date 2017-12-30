import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_FAILURE,
  LOG_OUT_SUCCESS,
  CREATE_USER_FAILURE,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  ADD_FAVORITE_SUCCESS,
  ADD_FAVORITE_FAILURE,
  ADD_FAVORITE_REQUEST,
  CLEAR_ERRORS
} from './actions';

const User = (
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
        loading: true,
        loginRequested: true,
        modalError: null,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        user: action.user,
        loggedIn: action.loggedIn,
        loading: false,
        modalError: null,
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        user: null,
        loggedIn: false,
        loginRequested: false,
        loading: false,
        modalError: action.errorMsg,
      };
    case LOG_OUT_REQUEST:
      return {
        ...state,
        logoutRequested: true,
        loading: true,
        baseError: null,
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        logoutRequested: false,
        loading: false,
        baseError: action.errorMsg,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        logoutRequested: false,
        loading: false,
        user: null,
        loggedIn: false,
      };
    case CREATE_USER_REQUEST:
      return {
        ...state,
        loginLoading: true,
        loginRequested: true,
        modalError: null,
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
        loggedIn: action.loggedIn,
        loading: false,
      };
    case CREATE_USER_FAILURE:
      return {
        ...state,
        user: null,
        loggedIn: false,
        loginRequested: false,
        loading: false,
        modalError: action.errorMsg,
      };
    case ADD_FAVORITE_REQUEST:
      return {
        ...state,
        loading: true,
        baseError: null,
      };
    case ADD_FAVORITE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          favorites: [...state.user.favorites, action.buoyId],
        },
      };
    case ADD_FAVORITE_FAILURE:
      return {
        ...state,
        loading: false,
        baseError: action.errorMsg,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        baseError: null,
        modalError: null,
      };
    default:
      return state;
  }
};

export default User;
