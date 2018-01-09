/* eslint-disable import/prefer-default-export */

import axios from 'axios';
import { parseString } from 'xml2js';
import { DOMParser } from 'xmldom';

// Models
import { addNewFavorite, removeFavorite } from '../models';

/**
 * @description Service to fetch the RSS feed from the NDBC server. Since it does not have CORS enabled we have to proxy 
 * this request from the server.

 * @return {Promise} Promise - A promise to fetch the RSS feed
 */
export const getBuoyDataService = (lat, lng, radius) => {
  // Check if latitude is north or south
  if (lat >= 0) {
    lat = `${lat}N`;
  } else {
    lat = `${Math.abs(lat)}S`;
  }
  // Check if latitude is west or east
  if (lng >= 0) {
    lng = `${lng}E`;
  } else {
    lng = `${Math.abs(lng)}W`;
  }

  return axios.get(
    `http://www.ndbc.noaa.gov/rss/ndbc_obs_search.php?lat=${lat}&lon=${lng}&radius=${radius}`
  );
};

/**
 * @description Service to parse the XML data returned from the feed.
 * 
 * @return {Promise} Promise to parse the XML
 */
export const parseXmlService = xml =>
  new Promise((resolve, reject) => {
    const xmlSerialized = new DOMParser().parseFromString(xml.data, 'text/xml');
    parseString(xmlSerialized, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });

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

/**
 * @description Service to normalize the buoy data so that it can be returned to the client.
 * 
 * @param {object} data - The unnormalized buoy data returned by the RSS feed
 * @param {object} userFavorites - The object containing the users favorites
 * 
 * @return {Array[Buoys]} An array of normalized buoy data
 */
export const normalizeBuoyDataService = (data, userFavorites) =>
  data.item.map(buoy => {
    // Parsing the different strings in the XML to create a clean JSON object
    const splitTitle = buoy.title[0].split('-');

    // Parse out the station ID and keep the rest as the title
    const [id, title] = [splitTitle[0], splitTitle.slice(1).join(' - ')];
    const buoyId = id.trim().split(' ')[1];

    // Determine whether or not the buoy is a favorite
    const isFavorite = !!userFavorites[buoyId];

    // Get rid of all the '\n      ' strings in the reading
    const readings = buoy.description[0].replace(/\n {8}/g, '');

    const lastUpdated = buoy.pubDate[0];
    const link = buoy.link[0];
    const [latitude, longitude] = buoy['georss:point'][0].split(' ');

    return {
      title,
      lastUpdated,
      buoyId,
      readings,
      link,
      isFavorite,
      lat: parseFloat(latitude),
      lng: parseFloat(longitude),
    };
  });

/**
 * @description Service to filter out unneeded buoy data so that it can then be returned to the client
 * 
 * @param {Array[object]} data - The normalized buoy data
 * @param {boolean} favoritesOnly - Boolean flag for determining if we should filter out non favorites
 * 
 * @return {Array[Buoys]} An array of normalized buoy data with uneeded data filtered out
 */
export const filterBuoyDataService = (data, favoritesOnly) =>
  // Filter out ship observations and if onlyFavorites filter out non favorites as well
  data.filter(buoy => {
    if (favoritesOnly) {
      return buoy.link !== 'http://www.ndbc.noaa.gov/ship_obs.php' && buoy.isFavorite;
    }
    return buoy.link !== 'http://www.ndbc.noaa.gov/ship_obs.php';
  });
