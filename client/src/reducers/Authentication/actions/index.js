import {
  makeActionCreator,
  hydrateUserSession,
  signInUser,
  signOutUser,
  createUser
} from '../../../lib';

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

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const createUserRequest = makeActionCreator(CREATE_USER_REQUEST);

export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const createUserSuccess = makeActionCreator(CREATE_USER_SUCCESS, 'user', 'loggedIn');

export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';
export const createUserFailure = makeActionCreator(CREATE_USER_FAILURE, 'errorMsg');

/**
 * Function for dispatching the log in requests
 *
 * @param {Object} data
 * @param {function} data.get Get a value given in the form by its key
 * @return {function} dispatcher
 */
export function logInUser(data) {
  return dispatch => {
    dispatch(logInRequest());

    const params = {
      username: data.get('username'),
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
 * Function for dispatching the a request to hydrate the session
 *
 * @param {function} data.get Get a value given in the form by its key
 * @return {function} dispatcher
 */
export function hydrateSession() {
  return dispatch => {
    // If we have a session cookie, making this request will succeed and return a user that we can hydrate the store with
    hydrateUserSession()
      .then(response => {
        // hydrating session succeeded dispatch an action to set the user in the store
        dispatch(logInSuccess(response.data, true));
      })
      .catch(() => {
        // Don't need to do anything here. Initial state is already logged out so we can ignore errors
      });
  };
}

/**
 * Function for dispatching the create user requests
 *
 * @param {Object} data
 * @param {function} data.get Get a value given in the form by its key
 * @return {function} dispatcher
 */
export function createNewUser(data) {
  return dispatch => {
    dispatch(createUserRequest());

    const params = {
      username: data.get('username'),
      password: data.get('password'),
    };

    // Attempt to sign in user with given information
    createUser(params)
      .then(response => {
        const user = response.data;
        // Login succeeded dispatch an action to set the user in the store
        dispatch(createUserSuccess(user, true));
      })
      .catch(err => dispatch(createUserFailure(err)));
  };
}

/**
 * Function for dispatching log out requests
 * @return {function} dispatcher
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
