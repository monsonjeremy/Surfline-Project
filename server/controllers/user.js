import {
  findUserService,
  createUserService,
  hashPasswordService,
  validatePasswordService,
  destroySessionService,
  reloadSessionService
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
  const user = await findUserService({ username, });

  // Validate that password match
  const isPasswordValid = await validatePasswordService(password, user.password);

  // If they do set the user ID in the session object
  if (isPasswordValid) {
    const userObject = {
      userId: user._id,
      username: user.username,
      favorites: user.favorites,
    };
    req.session.user = userObject;
    return userObject;
  }

  // Password don't match, throw an error
  const error = Error('Invalid username or password, please try again...');
  error.statusCode = 403;
  throw error;
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
 * @description Reload Session Controller allows us to reload a session the case that a user has left the page (emptying the redux store)
 * and come back to the page
 * @param {object} req The request object
 * @return {string} user The user information to be used to hydrate the redux store
 */
export const reloadSessionController = async req => {
  // Use the service to destroy the session
  await reloadSessionService(req);

  // Return the user information to be put into the redux store
  return req.session.user;
};

/**
 * @description Find User Controller gets user information from the database for a given user id
 * @param {string} userId The userId to find
 * @return {object} user The user information to be used
 */
export const getUserController = async (userId, req) => {
  // Prevent people from getting user info for a different user than they are logged in for
  if (userId !== req.session.user.userId) {
    const error = new Error("Hey, that's not your account...");
    error.statusCode = 401;
    throw error;
  }

  const user = await findUserService({ userId, });

  // Return the user information
  return {
    userId: user._id,
    username: user.username,
    favorites: user.favorites,
  };
};

/**
 * @description Create User Controller handles the logic for creating a user. It is given a username and password
 * andthen it will await the password hashing function and then return a promise to create the user which will be
 * consumed by the controller handler
 * @param {string} username The username for the given user
 * @param {string} password The password for the given user
 * @return {Promise} Promise to create the user
 */
export const createUserController = async (username, password, req) => {
  // Hash the password
  const hashedPassword = await hashPasswordService(password);

  // Pass the username and hashed password the create user service
  const createUser = await createUserService(username, hashedPassword);

  // Upon creating the user, also create a session to log the new user in
  if (createUser.userId) {
    const userObject = {
      userId: createUser.userId,
      username: createUser.username,
    };

    req.session.user = userObject;
  }

  // Send the response message to the controllerhandler
  return createUser;
};
