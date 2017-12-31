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
  REMOVE_FAVORITE_FAILURE,
  REMOVE_FAVORITE_REQUEST,
  REMOVE_FAVORITE_SUCCESS,
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
        isLoading: true,
        loginRequested: true,
        modalError: null,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        user: action.user,
        loggedIn: action.loggedIn,
        isLoading: false,
        modalError: null,
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        user: null,
        loggedIn: false,
        loginRequested: false,
        isLoading: false,
        modalError: action.errorMsg,
      };
    case LOG_OUT_REQUEST:
      return {
        ...state,
        logoutRequested: true,
        isLoading: true,
        baseError: null,
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        logoutRequested: false,
        isLoading: false,
        baseError: action.errorMsg,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        logoutRequested: false,
        isLoading: false,
        user: null,
        loggedIn: false,
      };
    case CREATE_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        loginRequested: true,
        modalError: null,
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
        loggedIn: action.loggedIn,
        isLoading: false,
      };
    case CREATE_USER_FAILURE:
      return {
        ...state,
        user: null,
        loggedIn: false,
        loginRequested: false,
        isLoading: false,
        modalError: action.errorMsg,
      };
    case ADD_FAVORITE_REQUEST:
      return {
        ...state,
        isLoading: true,
        baseError: null,
      };
    case ADD_FAVORITE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: {
          ...state.user,
          favorites: [...state.user.favorites, action.buoyId],
        },
      };
    case ADD_FAVORITE_FAILURE:
      return {
        ...state,
        isLoading: false,
        baseError: action.errorMsg,
      };
    case REMOVE_FAVORITE_REQUEST:
      return {
        ...state,
        isLoading: true,
        baseError: null,
      };
    case REMOVE_FAVORITE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: {
          ...state.user,
          favorites: state.user.favorites.filter(buoyId => buoyId !== action.buoyId),
        },
      };
    case REMOVE_FAVORITE_FAILURE:
      return {
        ...state,
        isLoading: false,
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
