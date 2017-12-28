import express from 'express';
import { controllerHandler, getBuoyDataController as getBuoyData } from '../controllers';

const router = express.Router();

/**
 * Endpoint to handle fetching and parsing the RSS Feed buoy data
 */
router.get('/data', controllerHandler(getBuoyData, () => []));

export default router;
