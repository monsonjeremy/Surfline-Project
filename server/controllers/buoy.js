/* eslint-disable import/prefer-default-export */

import { getBuoyDataService, parseXmlService } from '../services';

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
    const title = buoy.title[0];
    const lastUpdated = buoy.pubDate[0];
    const buoyId = title
      .split('-')[0]
      .trim()
      .split(' ')[1];
    const readings = buoy.description[0].replace(/\n {8}/g, '');
    const link = buoy.link[0];
    const geoPoint = buoy['georss:point'][0];

    return {
      title,
      lastUpdated,
      buoyId,
      readings,
      link,
      geoPoint,
    };
  });

  return {
    lastUpdated: data.lastBuildDate[0],
    buoys,
  };
};
