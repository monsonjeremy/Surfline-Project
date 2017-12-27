import express from 'express';
import {
  controllerHandler,
  createUserController as createUser,
  loginUserController as loginUser
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
router.get('/logout', (req, res) => {
  if (req.session) {
    // delete session object
    req.session.destroy(err => {
      if (err) {
        return 'Something went wrong destroying the session';
      }
      return res.redirect('/');
    });
  }
});

export default router;
