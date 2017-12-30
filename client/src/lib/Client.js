import axios from 'axios';

/**
 * Function that returns a promise to hit the sign-in endpoint
 *
 * @param {Object} params
 * @param {string} params.username
 * @param {string} params.password
 * @returns {Promise} promise
 */
export function signInUser(params) {
  // Set withCredentials to allow for session tokens
  const config = {
    withCredentials: true,
  };

  // Return axios promise
  return axios.post('/user/login', params, config);
}

/**
 * Function that returns a promise to hit the create user endpoint
 *
 * @param {Object} params
 * @param {string} params.username
 * @param {string} params.password
 * @returns {Promise} promise
 */
export function createUser(params) {
  // Set withCredentials to allow for session tokens
  const config = {
    withCredentials: true,
  };

  // Return axios promise
  return axios.post('/user/create', params, config);
}

/**
 * Function that returns a promise to hit the add a favorite to the users favorites
 *
 * @param {Object} params
 * @param {string} params.userId
 * @param {string} params.buoyId
 * @returns {Promise} promise
 */
export function addFavoriteToUser(params) {
  // Set withCredentials to allow for session tokens
  const config = {
    withCredentials: true,
  };

  // Return axios promise
  return axios.post('/buoy/favorite', params, config);
}

/**
 * Function that returns a promise to log a user out.
 * Returns 200 response and invalidates the session cookie
 *
 * @returns {Promise} promise
 */
export function signOutUser() {
  // Set withCredentials to allow for session tokens
  const config = {
    withCredentials: true,
  };

  // Return axios promise
  return axios.get('/user/logout', config);
}

/**
 * Function that returns a promise to hydrate a session.
 * Returns 200 response if there is a session cookie.
 *
 * @returns {Promise} promise
 */
export function hydrateUserSession() {
  // Set withCredentials to allow for session tokens
  const config = {
    withCredentials: true,
  };

  // Return axios promise
  return axios.get('/user/reload', config);
}

/**
 * Function that returns a promise to fetch the buoy data form the NDBC rss feed
 *
 * @returns {Promise} promise
 */
export function fetchBuoyData() {
  // Return axios promise
  return axios.get('/buoy/data');
}

/**
 * Function that returns a promise to fetch the user data
 *
 * @returns {Promise} promise
 */
export function fetchUserData(userId) {
  // Set withCredentials to allow for session tokens
  const config = {
    withCredentials: true,
  };

  // Return axios promise
  return axios.get(`/user/${userId}`, config);
}
