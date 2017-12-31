import {
  makeActionCreator,
  hydrateUserSession,
  signInUser,
  signOutUser,
  createUser,
  fetchUserData,
  addFavoriteToUser,
  removeFavoriteFromUser
} from '../../../lib';

// Actions
import { hideModal } from '../../Modal/actions';

export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const clearErrors = makeActionCreator(CLEAR_ERRORS);

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const logInRequest = makeActionCreator(LOG_IN_REQUEST);

export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const logInSuccess = makeActionCreator(LOG_IN_SUCCESS, 'user', 'loggedIn');

export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const logInFailure = makeActionCreator(LOG_IN_FAILURE, 'errorMsg');

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const getUserRequest = makeActionCreator(GET_USER_REQUEST);

/**
 * @description Function for dispatching the log in requests
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
      .then(response => {
        // Login succeeded dispatch an action to set the user in the store
        dispatch(logInSuccess(response.data, true));
        dispatch(hideModal());
      })
      .catch(err => {
        if (err.response) return dispatch(logInFailure(err.response.data));
        return dispatch(logInFailure('Something went wrong'));
      });
  };
}

/**
   * @description Function for dispatching a request to hydrate the session
   *
   * @param {function} data.get Get a value given in the form by its key
   * @return {function} dispatcher
   */
export function hydrateSession() {
  return async dispatch => {
    // If we have a session cookie, making this request will succeed and return a user that we can hydrate the store with
    hydrateUserSession()
      .then(session => {
        // Now that we have the user session reloaded, the favorite buoy data may be outdated so we need to hydrate user data
        dispatch(getUserRequest());

        fetchUserData(session.data.userId)
          // hydrating session and user succeeded dispatch an action to set the user in the store
          .then(user => dispatch(logInSuccess(user.data, true)))
          // Login failed even though the session was valid, throw the error to the client
          .catch(err => {
            if (err.response) return dispatch(logInFailure(err.response.data));
            return dispatch(logInFailure('Something went wrong'));
          });
      })
      .catch(() => {
        // Don't need to do anything here. Initial state is already logged out so we can ignore errors
      });
  };
}

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const logOutRequest = makeActionCreator(LOG_OUT_REQUEST);

export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const logOutSuccess = makeActionCreator(LOG_OUT_SUCCESS);

export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';
export const logOutFailure = makeActionCreator(LOG_OUT_FAILURE, 'errorMsg');

/**
 * @description Function for dispatching log out requests
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
      .catch(() => dispatch(logOutFailure('Something went wrong logging out, please try again.')));
  };
}

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const createUserRequest = makeActionCreator(CREATE_USER_REQUEST);

export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const createUserSuccess = makeActionCreator(CREATE_USER_SUCCESS, 'user', 'loggedIn');

export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';
export const createUserFailure = makeActionCreator(CREATE_USER_FAILURE, 'errorMsg');

/**
 * @description Function for dispatching the create user requests
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

    // Attempt to create user with given information
    createUser(params)
      .then(response => {
        const user = response.data;
        // Login succeeded dispatch an action to set the user in the store
        dispatch(createUserSuccess(user, true));
        dispatch(hideModal());
      })
      .catch(err => {
        if (err.response) return dispatch(createUserFailure(err.response.data));
        return dispatch(createUserFailure('Something went wrong'));
      });
  };
}

export const ADD_FAVORITE_REQUEST = 'ADD_FAVORITE_REQUEST';
export const addFavoriteRequest = makeActionCreator(ADD_FAVORITE_REQUEST);

export const ADD_FAVORITE_SUCCESS = 'ADD_FAVORITE_SUCCESS';
export const addFavoriteSuccess = makeActionCreator(ADD_FAVORITE_SUCCESS, 'buoyId');

export const ADD_FAVORITE_FAILURE = 'ADD_FAVORITE_FAILURE';
export const addFavoriteFailure = makeActionCreator(ADD_FAVORITE_FAILURE, 'errorMsg');

/**
 * @description Function for dispatching and handling the add favorite action
 *
 * @param {string} userId - userId to add the favorite to
 * @param {string} buoyId - The buoyId being favorited
 * 
 * @return {function} dispatcher
 */
export function addFavorite(userId, buoyId) {
  return dispatch => {
    dispatch(addFavoriteRequest());

    const params = {
      userId,
      buoyId,
    };

    addFavoriteToUser(params)
      .then(() => {
        // Adding favorite succeeded, dispatch an action to update the store to match
        dispatch(addFavoriteSuccess(buoyId));
      })
      .catch(() =>
        dispatch(addFavoriteFailure('Something went wrong adding the favorite, please try again'))
      );
  };
}

export const REMOVE_FAVORITE_REQUEST = 'REMOVE_FAVORITE_REQUEST';
export const removeFavoriteRequest = makeActionCreator(REMOVE_FAVORITE_REQUEST);

export const REMOVE_FAVORITE_SUCCESS = 'REMOVE_FAVORITE_SUCCESS';
export const removeFavoriteSuccess = makeActionCreator(REMOVE_FAVORITE_SUCCESS, 'buoyId');

export const REMOVE_FAVORITE_FAILURE = 'REMOVE_FAVORITE_FAILURE';
export const removeFavoriteFailure = makeActionCreator(REMOVE_FAVORITE_FAILURE, 'errorMsg');

/**
 * @description Function for dispatching and handling the remove favorite action
 *
 * @param {string} userId - userId to remove the favorite from
 * @param {string} buoyId - The buoyId being removed
 * 
 * @return {function} dispatcher
 */
export function removeFavorite(userId, buoyId) {
  return dispatch => {
    dispatch(removeFavoriteRequest());

    const params = {
      userId,
      buoyId,
    };

    removeFavoriteFromUser(params)
      .then(() => {
        // Removing favorite succeeded, dispatch an action to update the store to match
        dispatch(removeFavoriteSuccess(buoyId));
      })
      .catch(() =>
        dispatch(
          removeFavoriteFailure('Something went wrong removing the favorite, please try again')
        )
      );
  };
}
