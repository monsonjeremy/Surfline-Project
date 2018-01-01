import { makeActionCreator, fetchBuoyData } from '../../../lib';

export const BUOY_DATA_REQUEST = 'BUOY_DATA_REQUEST';
export const buoyDataRequest = makeActionCreator(BUOY_DATA_REQUEST);

export const BUOY_DATA_SUCCESS = 'BUOY_DATA_SUCCESS';
export const buoyDataSuccess = makeActionCreator(BUOY_DATA_SUCCESS, 'data');

export const BUOY_DATA_FAILURE = 'BUOY_DATA_FAILURE';
export const buoyDataFailure = makeActionCreator(BUOY_DATA_FAILURE, 'errorMsg');

export const SHOW_ALL_BUOYS = 'SHOW_ALL_BUOYS';
export const showAllBuoys = makeActionCreator(SHOW_ALL_BUOYS);

export const SHOW_FAV_BUOYS = 'SHOW_FAV_BUOYS';
export const showFavBuoys = makeActionCreator(SHOW_FAV_BUOYS);

export const SELECT_BUOY = 'SELECT_BUOY';
export const selectBuoy = makeActionCreator(SELECT_BUOY, 'buoyId');

/**
 * Function for dispatching a request to hydrate the buoy data
 * 
 * @param {number} lat - latitude to query data for
 * @param {number} lng - longitude to query data for
 * @param {number} radius - radius to query data for
 * @return {function} dispatcher
 */
export function hydrateBuoyData(lat, lng, radius) {
  return dispatch => {
    dispatch(buoyDataRequest());

    const params = {
      lat,
      lng,
      radius,
    };
    // Make a request to the endpoint for the buoy data
    fetchBuoyData(params)
      .then(response => {
        // Now that we are given an XML response, we need to parse it and send the relevant data to the store
        dispatch(buoyDataSuccess(response.data, true));
      })
      .catch(err => {
        if (err.response) return dispatch(buoyDataFailure(err.response.data));
        return dispatch(buoyDataFailure('Something went wrong fetching the buoy data'));
      });
  };
}
