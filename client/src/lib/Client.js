import axios from 'axios';

/**
 * Function that returns a promise to hit the sign-in endpoint
 *
 * @param {Object} params
 * @param {function} params.get
 * @param {function} cb
 * @returns {Promise} promise
 */
export function signInUser(params) {
  // Set withCredentials to allow for session tokens
  const config = {
    withCredentials: true,
  };

  // Return axios promise
  return axios.post('http://localhost:5000/api/auth/login', params, config);
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
  return axios.post('http://localhost:5000/api/auth/logout', null, config);
}
