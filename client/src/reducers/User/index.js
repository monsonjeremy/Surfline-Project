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
  ADD_FAVORITE_REQUEST
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
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        user: action.user,
        loggedIn: action.loggedIn,
        loading: false,
        error: null,
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        user: null,
        loggedIn: false,
        loginRequested: false,
        loading: false,
        error: action.errMsg,
      };
    case LOG_OUT_REQUEST:
      return {
        ...state,
        logoutRequested: true,
        loading: true,
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        logoutRequested: false,
        loading: false,
        error: action.errMsg,
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
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
        loggedIn: action.loggedIn,
        loading: false,
        error: null,
      };
    case CREATE_USER_FAILURE:
      return {
        ...state,
        user: null,
        loggedIn: false,
        loginRequested: false,
        loading: false,
        error: action.errMsg,
      };
    case ADD_FAVORITE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_FAVORITE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: {
          ...state.user,
          favorites: [...state.user.favorites, action.buoyId],
        },
      };
    case ADD_FAVORITE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.errMsg,
      };
    default:
      return state;
  }
};

export default User;
