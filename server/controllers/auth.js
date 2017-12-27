import {
  findUserService,
  createUserService,
  hashPasswordService,
  validatePasswordService,
  destroySessionService
} from '../services';

/**
 * @description Login User Controller handles the logic for logging in a user. It is given a username and password
 * and then it will await the the password comparison function and then from there return a promise to log the user in
 * or throw an error
 * @param {string} username The username for the given user
 * @param {string} password The password for the given user
 * @param {object} req The request object
 * @param {object} req.session The request session object which has info about the current session
 * @param {string} req.session.userId The user id for the current session if there is one
 * @return {string} message The message to send back in the response object
 */
export const loginUserController = async (username, password, req) => {
  // Check for the user in the DB
  const user = await findUserService(username);

  // Validate that password match
  const isPasswordValid = await validatePasswordService(password, user.password);

  // If they do set the user ID in the session object
  if (isPasswordValid) {
    req.session.userId = user._id;
    return `Password valid, user ${user._id} logged in!`;
  }

  // We won't actually reach this here theoretically because errors should be caught by the services
  // but it is a good fail safe
  throw Error('Invalid password, please try again...');
};

/**
 * @description Logout User Controller handles the logic for logging out a user. It will just destroy the current session
 * and leave it to the client side to handle its own login/logout state
 * @param {object} req The request object
 * @return {string} message The message to send back in the response object
 */
export const logoutUserController = async req => {
  // Use the service to destroy the session
  const destroySession = await destroySessionService(req);

  return destroySession;
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

  // Pass the username and hashed password the create user service
  const createUser = await createUserService(username, hashedPassword);

  // Send the response message to the controllerhandler
  return createUser;
};
