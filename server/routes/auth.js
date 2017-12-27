import express from 'express';
import {
  controllerHandler,
  createUserController as createUser,
  loginUserController as loginUser,
  logoutUserController as logoutUser
} from '../controllers';

const router = express.Router();

/**
 * Endpoint to handle creating a user and creating a session
 */
router.post(
  '/create',
  controllerHandler(createUser, req => [req.body.username, req.body.password])
);

/**
 * Endpoint to handle logging in a user and creating a session
 */
router.post(
  '/login',
  controllerHandler(loginUser, req => [req.body.username, req.body.password, req])
);

// GET /logout
router.get('/logout', controllerHandler(logoutUser, req => [req], true));

export default router;
