import { UPDATE_MAP_CENTER, UPDATE_MAP_ZOOM, MAP_LOADED } from './actions';

const Maps = (state = { center: { lat: 40, lng: -73, }, zoom: 8, isLoading: true, }, action) => {
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
    default:
      return state;
  }
};

export default Maps;
