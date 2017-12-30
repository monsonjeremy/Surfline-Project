import {
  BUOY_DATA_FAILURE,
  BUOY_DATA_REQUEST,
  BUOY_DATA_SUCCESS,
  SHOW_ALL_BUOYS,
  SHOW_FAV_BUOYS,
  SELECT_BUOY
} from './actions';

const Data = (
  state = {
    filterFavorites: false,
    buoy: {
      isLoading: false,
      isRequested: false,
    },
    selectedBuoy: null,
  },
  action
) => {
  switch (action.type) {
    case BUOY_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        buoy: {
          ...state.buoy,
          isRequested: true,
          baseError: null,
        },
      };
    case BUOY_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        buoy: {
          ...state.buoy,
          isRequested: false,
          data: action.data,
        },
      };
    case BUOY_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        buoy: {
          ...state.buoy,
          isRequested: false,
          data: null,
          baseError: action.errorMsg,
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
    case SELECT_BUOY:
      return {
        ...state,
        selectedBuoy: action.buoyId,
      };
    default:
      return state;
  }
};

export default Data;
