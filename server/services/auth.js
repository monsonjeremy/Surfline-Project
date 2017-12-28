/* eslint-disable import/prefer-default-export */

import bcrypt from 'bcrypt';
import { User, findUser } from '../models';

/**
 * Service to hash a password and return it
 * 
 * @param {string} password The password to hash
 * @return {string} hashedPass
 */
export const hashPasswordService = password =>
  bcrypt
    .hash(password, 10)
    .then(hash => hash)
    .catch(e => {
      throw e;
    });

/**
 * Service to compare a password to the hashed password in the DB
 * 
 * @param {string} password The password sent by the user
 * @param {string} dbPassword The password from the db
 * @return {boolean} result
 */
export const validatePasswordService = (password, dbPassword) => {
  if (!password) {
    const error = new Error('Please provide a password.');
    error.statusCode = 400;
    throw error;
  }

  return bcrypt
    .compare(password, dbPassword)
    .then(result => result)
    .catch(err => {
      throw err;
    });
};

/**
 * Service to find a user by username
 * 
 * @param {string} username The username for the given user
 * @return {Promise} Promise to lookup the user in the database
 */
export const findUserService = username =>
  findUser(username).then(user => {
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    return user;
  });

/**
 * Service to login a user and create a session
 * 
 * @param {string} username The username for the given user
 * @param {string} password The password for the given user
 * @return {Promise} Promise to get the buoy data
 */
export const createUserService = (username, password) => {
  const userData = {
    username,
    password,
  };
  // use schema.create to insert data into the db
  return User.create(userData)
    .then(user => ({
      username: user.username,
      userId: user._id,
    }))
    .catch(err => {
      throw err;
    });
};

/**
 * Service to destroy a session
 * @param {object} req The request object
 * @param {object} req.session The request session object which has info about the current session
 * @param {function} req.session.destroy Function given by express-session to kill the session
 * @return {Promise} Promise to destroy the session
 */
export const destroySessionService = req =>
  new Promise((resolve, reject) =>
    req.session.destroy(err => {
      if (err) {
        return reject('Something went wrong destroying the session');
      }
      return resolve('Session successfully nuked.');
    })
  );

/**
 * Service to reload a session when the user navigates back to the page
 * @param {object} req The request object
 * @param {object} req.session The request session object which has info about the current session
 * @param {function} req.session.reload Function given by express-session to reload the session
 * @return {Promise} Promise to reload the session
 */
export const reloadSessionService = req =>
  new Promise((resolve, reject) =>
    req.session.reload(err => {
      if (err) {
        reject(err);
        const error = new Error(err);
        err.statusCode = 403;
        throw error;
      }
      return resolve('Session successfully reloaded');
    })
  );
