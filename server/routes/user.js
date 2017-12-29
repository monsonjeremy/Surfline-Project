import express from 'express';
import {
  controllerHandler,
  createUserController as createUser,
  loginUserController as loginUser,
  logoutUserController as logoutUser,
  reloadSessionController as reloadSession,
  getUserController as getUser
} from '../controllers';

const router = express.Router();

/**
 * Endpoint to handle creating a user and creating a session
 */
router.post(
  '/create',
  controllerHandler(createUser, req => [req.body.username, req.body.password, req])
);

/**
 * Endpoint to handle logging in a user and creating a session
 */
router.post(
  '/login',
  controllerHandler(loginUser, req => [req.body.username, req.body.password, req])
);

/**
 * Endpoint to handle logging in a user and creating a session
 */
router.get('/reload', controllerHandler(reloadSession, req => [req]));

/**
 * Endpoint to handle logging out and destroying a session
 */
router.get('/logout', controllerHandler(logoutUser, req => [req], true));

/**
 * Endpoint to handle getting user information by userId 
 */
router.get('/:userId', controllerHandler(getUser, req => [req.params.userId], true));

export default router;
