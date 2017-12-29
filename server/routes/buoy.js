import express from 'express';
import {
  controllerHandler,
  getBuoyDataController as getBuoyData,
  addFavoriteController as addFavorite
} from '../controllers';

const router = express.Router();

/**
 * Endpoint to handle fetching and parsing the RSS Feed buoy data
 */
router.get('/data', controllerHandler(getBuoyData, () => []));

/**
 * Endpoint to add a new favorite to a given user
 */
router.post('/favorite', controllerHandler(addFavorite, req => [req.body.userId, req.body.buoyId]));

export default router;
