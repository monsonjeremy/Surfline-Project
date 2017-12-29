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

/**
 * Function for dispatching the a request to hydrate the session
 *
 * @param {function} data.get Get a value given in the form by its key
 * @return {function} dispatcher
 */
export function hydrateBuoyData() {
  return dispatch => {
    dispatch(buoyDataRequest());
    // Make a request to the endpoint for the buoy data
    fetchBuoyData()
      .then(response => {
        // Now that we are given an XML response, we need to parse it and send the relevant data to the store
        dispatch(buoyDataSuccess(response.data, true));
      })
      .catch(e => {
        dispatch(buoyDataFailure(e));
      });
  };
}
