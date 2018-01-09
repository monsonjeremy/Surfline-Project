import React from 'react';
import PropTypes from 'prop-types';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';

// Custom styles for the map
import mapStyles from './MapStyle.json';

import '../../styles/Maps/Maps.css';

/**
 * @description Maps component represents the view for the Maps container which 
 * contains logic for rendering and controlling the google map 
 * 
 * Documentation for the react-google-maps library available at: https://tomchentw.github.io/react-google-maps/
 * 
 * @param {object} props - Props
 * @param {function} props.handleMapLoad - Function for handling the event whether the map has loaded onto the page
 * @param {function} props.handleZoomChange - Function for handling the event where the map zoom level has changed
 * @param {number} props.zoom - Determines the zoom level of the map
 * @param {object} props.center - Object representing where the map is centered
 * @param {number} props.center.lat - Number representing the latitude the map is centered on
 * @param {number} props.center.lng - Number representing the longitude the map is centered on
 * @param {node} props.children - Children to render as children of the Map component
 * 
 * @returns {<Maps />}
 */
const Maps = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      ref={props.handleMapLoad}
      zoom={props.zoom}
      center={props.center}
      defaultOptions={{
        styles: mapStyles,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
      }}
      onZoomChanged={props.handleZoomChange}
      onClick={props.handleMapClick}
      onBoundsChanged={props.handleBoundsChanged}
    >
      {props.children}
    </GoogleMap>
  ))
);

Maps.propTypes = {
  children: PropTypes.node,
  handleZoomChange: PropTypes.func.isRequired,
  handleBoundsChanged: PropTypes.func.isRequired,
  handleMapLoad: PropTypes.func.isRequired,
  handleMapClick: PropTypes.func.isRequired,
};

Maps.defaultProps = {
  children: null,
};

export default Maps;
