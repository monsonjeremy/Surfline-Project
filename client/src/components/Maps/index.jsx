import React from 'react';
import PropTypes from 'prop-types';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import mapStyles from './MapStyle.json';

import '../../styles/Maps/Maps.css';

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
    >
      {props.children}
    </GoogleMap>
  ))
);

Maps.propTypes = {
  children: PropTypes.node,
  handleZoomChange: PropTypes.func.isRequired,
  handleMapLoad: PropTypes.func.isRequired,
};

Maps.defaultProps = {
  children: null,
};

export default Maps;
