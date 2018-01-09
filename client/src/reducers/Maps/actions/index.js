import { makeActionCreator } from '../../../lib';

// Actions
import { hydrateBuoyData } from '../../Data/actions';

export const UPDATE_MAP_ZOOM = 'UPDATE_MAP_ZOOM';
export const updateMapZoom = makeActionCreator(UPDATE_MAP_ZOOM, 'zoom');

export const UPDATE_MAP_BOUNDS = 'UPDATE_MAP_BOUNDS';
export const updateMapBounds = makeActionCreator(UPDATE_MAP_BOUNDS, 'bounds');

export const UPDATE_MAP_CENTER = 'UPDATE_MAP_CENTER';
export const updateMapCenter = makeActionCreator(UPDATE_MAP_CENTER, 'center');

export const MAP_LOADED = 'MAP_LOADED';
export const mapLoaded = makeActionCreator(MAP_LOADED);

/**
 * @description Function for dispatching actions to update the map zoom and center on selection of a buoy 
 * 
 * @param {object} center - the object containing lat and long center
 * @param {number} lat - the latitude to center the map on
 * @param {number} lng - the longitude to center the map on
 * @return {function} dispatcher
 */
export function updateMapCenterAndZoom(center, zoom) {
  return dispatch => {
    dispatch(updateMapZoom(zoom));
    dispatch(updateMapCenter(center));
  };
}

export const UPDATE_RADIUS_LAT_LNG_REQUEST = 'UPDATE_RADIUS_LAT_LNG_REQUEST';
export const updateRadiusLatLngRequest = makeActionCreator(UPDATE_RADIUS_LAT_LNG_REQUEST);

export const UPDATE_RADIUS_LAT_LNG_SUCCESS = 'UPDATE_RADIUS_LAT_LNG_SUCCESS';
export const updateRadiusLatLngSuccess = makeActionCreator(
  UPDATE_RADIUS_LAT_LNG_SUCCESS,
  'radius',
  'lat',
  'lng'
);

export const UPDATE_RADIUS_LAT_LNG_FAILURE = 'UPDATE_RADIUS_LAT_LNG_FAILURE';
export const updateRadiusLatLngFailure = makeActionCreator(UPDATE_RADIUS_LAT_LNG_FAILURE, 'errMsg');

/**
 * Function for dispatching an action to update the radius and lat long values then re-query the data from the RSS Feed
 * 
 * @param {number} radius - new radius
 * @param {number} lat - latitude to query data for
 * @param {number} lng - longitude to query data for 
 * 
 * @return {function} dispatcher
 */
export function updateRadiusLatLng(radius, lat, lng) {
  return dispatch => {
    dispatch(updateRadiusLatLngRequest());

    /*
      Set the max radius to 500 for now. This avoids major performance hits from large object lookups.
      ideally in a future state these lookups will be moved to a web worker or something so that we could
      avoid blocking the event loop and pausing execution :(
      
      There are just so many markers and debugging and optimizing performance would be a more granular difficult
      task than time allows for at the moment.

      Allow 999,999 so that we can maximize and show all favorites in the world
    */
    if ((radius > 500 || radius < 1) && radius !== 999999) {
      return dispatch(
        updateRadiusLatLngFailure('Radius invalid... Try a number between 1 and 999,999')
      );
    }

    // check for valid lat values
    if (lat > 90 || lat < -90) {
      return dispatch(
        updateRadiusLatLngFailure('Latitude invalid... Try a number between -90 and 90')
      );
    }

    // check for valid long values
    if (lng > 180 || lng < -180) {
      return dispatch(
        updateRadiusLatLngFailure('Longitude invalid... Try a number between -180 and 180')
      );
    }

    dispatch(updateRadiusLatLngSuccess(radius, lat, lng));
    return dispatch(hydrateBuoyData(lat, lng, radius));
  };
}
