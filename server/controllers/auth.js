import {
  findUserService,
  createUserService,
  hashPasswordService,
  validatePasswordService
} from '../services';

/**
 * @description Login User Controller handles the logic for logging in a user. It is given a username and password
 * and then it will await the the password comparison function and then from there return a promise to log the user in
 * or throw an error
 * @param {string} username The username for the given user
 * @param {string} password The password for the given user
 * @return {Promise} Promise to log in the user
 */
export const loginUserController = async (username, password, req) => {
  const user = await findUserService(username);
  const isPasswordValid = await validatePasswordService(password, user.password);

  if (isPasswordValid) {
    req.session.userId = user._id;
    return `Password valid, user ${user._id} logged in!`;
  }
};

/**
 * @description Create User Controller handles the logic for creating a user. It is given a username and password
 * and then it will await the password hashing function and then return a promise to create the user which will be
 * consumed by the controller handler
 * @param {string} username The username for the given user
 * @param {string} password The password for the given user
 * @return {Promise} Promise to create the user
 */
export const createUserController = async (username, password) => {
  // Hash the password
  const hashedPassword = await hashPasswordService(password);
  // Pass the username and hashed passwrod the create user service
  const createUser = await createUserService(username, hashedPassword);
  return createUser;
};
