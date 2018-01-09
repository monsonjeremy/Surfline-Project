/* eslint-disable import/prefer-default-export */

import {
  getBuoyDataService,
  parseXmlService,
  addFavoriteService,
  removeFavoriteService,
  findUserService,
  normalizeBuoyDataService,
  filterBuoyDataService
} from '../services';

/**
 * @description Get Buoy Data Controller will retrieve the buoy data from the endpoint,
 *              parse it and format/clean up the data so that it can be passed to the client
 * 
 * @param {number} lat - latitude to get data for
 * @param {number} lng - longitude to get data for
 * @param {number} radius - radius to get data for
 * @param {boolean} favoritesOnly - whether or not the user is asking for favorites
 * 
 * @returns {object} response
 */
export const getBuoyDataController = async (lat, lng, radius, favoritesOnly, req) => {
  // If the user is authenticated then fetch his favorites, otherwise just use placeholder values
  let userFavorites = {};
  let user = {};
  if (req.session.user) {
    user = await findUserService({ userId: req.session.user.userId, });
    userFavorites = user.favorites;
  }

  // If the user is asking for favorites, then we need the radius to be 999,999
  if (favoritesOnly) radius = 999999;

  // Hit the RSS feed endpoint
  const xml = await getBuoyDataService(lat, lng, radius);

  // Parse the XML using the parsing service
  const parsedXml = await parseXmlService(xml);

  // Clean the data and return the info we want in a nice JSON structure
  const data = parsedXml.rss.channel[0];

  // If there are no items in the parsed XML then no buoys were found in the given range, lat, and long
  if (!data.item) {
    const error = new Error('No buoys found for given lat, long, and radius...');
    error.statusCode = 400;
    throw error;
  }

  // If the title of the first item is "Usage Instructions", we know that the RSS Feed has been given invalid lat long values
  // Since it does not throw an error this was a sensible check to make
  if (data.item[0].title[0] === 'Usage Instructions') {
    const error = new Error('Invalid lat and long values');
    error.statusCode = 400;
    throw error;
  }

  // Filter and normalize the buoy data so that we can return relevant and proper data to the client
  const buoys = filterBuoyDataService(normalizeBuoyDataService(data, userFavorites), favoritesOnly);

  // If there are no buoys left after filtering out the ship observations, throw error
  if (buoys.length === 0) {
    let error = new Error('No buoys found for given lat, long, and radius...');
    if (favoritesOnly) {
      error = new Error('You currently have no favorites...');
    }
    error.statusCode = 400;
    throw error;
  }

  return {
    lastUpdated: data.lastBuildDate[0],
    buoys,
  };
};

/**
 * @description Add Favorite Controller will take a given user ID and buoy ID and then add the buoyID 
 * to the users favorites
 * 
 * @param {string} userId - The user ID to update
 * @param {string} buoyId - The buoy ID to add to favorites
 * @returns {object} response - The response object
 */
export const addFavoriteController = async (userId, buoyId, req) => {
  if (userId !== req.session.user.userId) {
    const error = new Error("Hey, that's not your account...");
    error.statusCode = 401;
    throw error;
  }
  return addFavoriteService(userId, buoyId);
};

/**
 * @description Remove Favorite Controller will take a given user ID and buoy ID and then remove the buoyID 
 * from the users favorites
 * 
 * @param {string} userId - The user ID to update
 * @param {string} buoyId - The buoy ID to add to favorites
 * @returns {object} response - The response object
 */
export const removeFavoriteController = async (userId, buoyId, req) => {
  if (userId !== req.session.user.userId) {
    const error = new Error("Hey, that's not your account...");
    error.statusCode = 401;
    throw error;
  }
  return removeFavoriteService(userId, buoyId);
};
