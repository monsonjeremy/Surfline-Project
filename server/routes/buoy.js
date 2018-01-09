import express from 'express';
import {
  controllerHandler,
  getBuoyDataController as getBuoyData,
  addFavoriteController as addFavorite,
  removeFavoriteController as removeFavorite
} from '../controllers';

const router = express.Router();

/**
 * Endpoint to handle fetching and parsing the RSS Feed buoy data
 */
router.post(
  '/data',
  controllerHandler(getBuoyData, req => [
    req.body.lat,
    req.body.lng,
    req.body.radius,
    req.body.favoritesOnly,
    req
  ])
);

/**
 * Endpoint to add a new favorite to a given user
 */
router.post(
  '/favorite',
  controllerHandler(addFavorite, req => [req.body.userId, req.body.buoyId, req], true)
);

/**
 * Endpoint to remove a favorite from a given user
 */
router.post(
  '/favorite/remove',
  controllerHandler(removeFavorite, req => [req.body.userId, req.body.buoyId, req], true)
);

export default router;
