/* eslint-disable import/prefer-default-export */

import axios from 'axios';
import { parseString } from 'xml2js';

// Models
import { addNewFavorite, removeFavorite } from '../models';

/**
 * @description Service to fetch the RSS feed from the NDBC server. Since it does not have CORS enabled we have to proxy 
 * this request from the server.

 * @return {Promise} Promise - A promise to fetch the RSS feed
 */
export const getBuoyDataService = () =>
  axios.get('http://www.ndbc.noaa.gov/rss/ndbc_obs_search.php?lat=40N&lon=73W&radius=100');

/**
 * @description Service to parse the XML data returned from the feed.
 * 
 * @return {Promise} Promise to parse the XML
 */
export const parseXmlService = xml =>
  new Promise((resolve, reject) =>
    parseString(xml.data, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    })
  );

/**
 * @description Service to add a new favorite buoy to a given user.
 * 
 * @return {Promise} Promise to add a new favorite to the user in the DB
 */
export const addFavoriteService = (userId, buoyId) => addNewFavorite(userId, buoyId);

/**
 * @description Service to remove a favorite buoy for a given user.
 * 
 * @return {Promise} Promise to remove favorite from the user in the DB
 */
export const removeFavoriteService = (userId, buoyId) => removeFavorite(userId, buoyId);
