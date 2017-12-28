import {
  BUOY_DATA_FAILURE,
  BUOY_DATA_REQUEST,
  BUOY_DATA_SUCCESS,
  SHOW_ALL_BUOYS,
  SHOW_FAV_BUOYS
} from './actions';

const Data = (
  state = {
    filterFavorites: false,
    buoy: {
      data: null,
    },
  },
  action
) => {
  switch (action.type) {
    case BUOY_DATA_REQUEST:
      return {
        ...state,
        buoy: {
          ...state.buoy,
          isLoading: true,
          isRequested: true,
        },
      };
    case BUOY_DATA_SUCCESS:
      return {
        ...state,
        buoy: {
          ...state.buoy,
          isLoading: false,
          isRequested: false,
          data: action.data,
        },
      };
    case BUOY_DATA_FAILURE:
      return {
        ...state,
        buoy: {
          ...state.buoy,
          isLoading: false,
          isRequested: false,
          data: null,
          error: action.errMsg,
        },
      };
    case SHOW_ALL_BUOYS:
      return {
        ...state,
        filterFavorites: false,
      };
    case SHOW_FAV_BUOYS:
      return {
        ...state,
        filterFavorites: true,
      };
    default:
      return state;
  }
};

export default Data;
