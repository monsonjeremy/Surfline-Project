import { makeActionCreator } from '../../../lib';

export const UPDATE_MAP_ZOOM = 'UPDATE_MAP_ZOOM';
export const updateMapZoom = makeActionCreator(UPDATE_MAP_ZOOM, 'zoom');

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
