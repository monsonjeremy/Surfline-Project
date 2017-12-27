import { makeActionCreator } from '../../../lib';
// helpers
import { signInUser, signOutUser } from '../../../lib/Client';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const logInRequest = makeActionCreator(LOG_IN_REQUEST);

export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const logInSuccess = makeActionCreator(LOG_IN_SUCCESS, 'user', 'loggedIn');

export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const logInFailure = makeActionCreator(LOG_IN_FAILURE, 'errorMsg');

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const logOutRequest = makeActionCreator(LOG_OUT_REQUEST);

export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const logOutSuccess = makeActionCreator(LOG_OUT_SUCCESS);

export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';
export const logOutFailure = makeActionCreator(LOG_OUT_FAILURE, 'errorMsg');

/**
 * Function for dispatching the log in requests
 *
 * @param {Object} data
 * @param {function} data.get Get a value given in the form by key
 */
export function logInUser(data) {
  return dispatch => {
    dispatch(logInRequest());

    const params = {
      email: data.get('email'),
      password: data.get('password'),
    };
    // Attempt to sign in user with given information
    signInUser(params)
      .then(response =>
        // Login succeeded dispatch an action to set the user in the store
        dispatch(logInSuccess(response.data, true))
      )
      .catch(err => dispatch(logInFailure(err)));
  };
}

/**
 * Function for dispatching log out requests
 */
export function logOutUser() {
  return dispatch => {
    dispatch(logOutRequest());

    // Attempt to sign out user
    signOutUser()
      .then(() =>
        // Log out succeeded dispatch an action to clear the user in the store
        dispatch(logOutSuccess())
      )
      // Log out failed for some reason, display an error
      .catch(err => dispatch(logOutFailure(err)));
  };
}
