import {
  UPDATE_MAP_CENTER,
  UPDATE_MAP_ZOOM,
  MAP_LOADED,
  UPDATE_RADIUS_LAT_LNG_FAILURE,
  UPDATE_RADIUS_LAT_LNG_REQUEST,
  UPDATE_RADIUS_LAT_LNG_SUCCESS
} from './actions';

const Maps = (
  state = { center: { lat: 40, lng: -73, }, zoom: 8, radius: 100, isLoading: true, baseError: null, },
  action
) => {
  switch (action.type) {
    case UPDATE_MAP_ZOOM:
      return {
        ...state,
        zoom: action.zoom,
      };
    case UPDATE_MAP_CENTER:
      return {
        ...state,
        center: action.center,
      };
    case MAP_LOADED:
      return {
        ...state,
        isLoading: false,
      };
    case UPDATE_RADIUS_LAT_LNG_REQUEST:
      return {
        ...state,
        baseError: null,
      };
    case UPDATE_RADIUS_LAT_LNG_SUCCESS:
      return {
        ...state,
        radius: action.radius,
        center: {
          lat: action.lat,
          lng: action.lng,
        },
      };
    case UPDATE_RADIUS_LAT_LNG_FAILURE:
      return {
        ...state,
        baseError: action.errMsg,
      };
    default:
      return state;
  }
};

export default Maps;
