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
export const validatePasswordService = (password, dbPassword) =>
  bcrypt
    .compare(password, dbPassword)
    .then(result => result)
    .catch(err => {
      throw err;
    });

/**
 * Service to find a user by username
 * 
 * @param {string} username The username for the given user
 * @return {Promise} Promise to lookup the user in the database
 */
export const findUserService = username => findUser(username);

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
    .then(user => user)
    .catch(err => err);
};
