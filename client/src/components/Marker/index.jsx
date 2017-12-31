import React from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import PropTypes from 'prop-types';

// The path for the custom marker icon on the map
const markerPath = `M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z`;

/**
 * @description CustomMarker component represents the view for the Marker container which 
 * contains logic for rendering and controlling the markers on the google map
 * 
 * Documentation for the react-google-maps library available at: https://tomchentw.github.io/react-google-maps/
 * 
 * @param {object} props - Props
 * @param {boolean} props.selected - Whether or not the current marker is selected
 * @param {boolean} props.visible - Whether or not the current marker is visible
 * @param {boolean} props.isFavorite - Whether or not the current marker is a favorite buoy
 * @param {object} props.position - Object representing where the marker is positioned
 * @param {number} props.position.lat - Number representing the latitude the marker is positioned on
 * @param {number} props.position.lng - Number representing the longitude the marker is positioned on
 * @param {string} props.buoyId - The buoy ID for the current marker
 * @param {string} props.readings - The readings for the buoy of the current marker
 * @param {function} props.dispatchSelectBuoy - Function to dispatch and action to select the buoy ID of the marker
 * @param {function} props.handleMarkerClick - Function to dispatch related actions when marker is clicked
 * 
 * @returns {<CustomMarker />}
 */
const CustomMarker = props => {
  // Define the icon styles

  let fillColor = '#3477db';
  if (props.isFavorite) fillColor = '#34db58';
  if (props.selected) fillColor = '#d24d57';
  const icon = {
    fillColor,
    path: markerPath,
    fillOpacity: 1,
    anchor: new google.maps.Point(250, 504),
    strokeWeight: 0.5,
    strokeColor: 'black',
    scale: props.selected ? 0.05 : 0.03,
  };

  return (
    <Marker
      clickable
      options={{ icon, }}
      animation={google.maps.Animation.DROP}
      onClick={() => props.handleMarkerClick(props.position, props.buoyId)}
      position={props.position}
      visible={props.visible}
    >
      {props.selected &&
        props.visible && (
          // When we close the info window, we can assume the user no longer wants that buoy selected.
          // Dispatch an action to set selected buoy to null
          <InfoWindow onCloseClick={() => props.dispatchSelectBuoy(null)}>
            <div>
              <h3 className="sp-info-title">Station ID: {props.buoyId}</h3>
              <p className="sp-info-text" dangerouslySetInnerHTML={{ __html: props.readings, }} />
            </div>
          </InfoWindow>
        )}
    </Marker>
  );
};

CustomMarker.propTypes = {
  // Props
  selected: PropTypes.bool,
  position: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  visible: PropTypes.bool.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  readings: PropTypes.string.isRequired,
  buoyId: PropTypes.string.isRequired,

  // Functions and dispatchers
  handleMarkerClick: PropTypes.func.isRequired,
  dispatchSelectBuoy: PropTypes.func.isRequired,
};

CustomMarker.defaultProps = {
  selected: false,
};

export default CustomMarker;
