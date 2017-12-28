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
  return axios.post('http://localhost:3006/auth/login', params, config);
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
  return axios.post('http://localhost:3006/auth/create', params, config);
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
  return axios.get('http://localhost:3006/auth/logout', config);
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
  return axios.get('http://localhost:3006/auth/reload', config);
}

/**
 * Function that returns a promise to fetch the buoy data form the NDBC rss feed
 *
 * @returns {Promise} promise
 */
export function fetchBuoyData() {
  // Return axios promise
  return axios.get('http://localhost:3006/buoy/data');
}
