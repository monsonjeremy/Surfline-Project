/* eslint-disable import/prefer-default-export */

import { getBuoyDataService, parseXmlService, addFavoriteService } from '../services';

/**
 * @description Get Buoy Data Controller will retrieve the buoy data from the endpoint,
 *              parse it and format/clean up the data so that it can be passed to the client
 * 
 * @returns {object} response
 */
export const getBuoyDataController = async () => {
  // Hit the RSS feed endpoint
  const xml = await getBuoyDataService();

  // Parse the XML using the parsing service
  const parsedXml = await parseXmlService(xml);

  // Clean the data and return the info we want in a nice JSON structure
  const data = parsedXml.rss.channel[0];
  const buoys = data.item.map(buoy => {
    // Parsing the different strings in the XML to create a clean JSON object
    const splitTitle = buoy.title[0].split('-');

    // Parse out the station ID and keep the rest as the title
    const [id, title] = [splitTitle[0], splitTitle.slice(1).join(' - ')];
    const buoyId = id.trim().split(' ')[1];

    // Get rid of all the '\n      ' strings in the reading
    const readings = buoy.description[0].replace(/\n {8}/g, '');

    const lastUpdated = buoy.pubDate[0];
    const link = buoy.link[0];
    const [lat, long] = buoy['georss:point'][0].split(' ');

    return {
      title,
      lastUpdated,
      buoyId,
      readings,
      link,
      lat: parseFloat(lat),
      lng: parseFloat(long),
    };
  });

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
export const addFavoriteController = async (userId, buoyId) => addFavoriteService(userId, buoyId);
