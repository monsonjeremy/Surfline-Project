import React from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import PropTypes from 'prop-types';

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
const CustomMarker = props => (
  <Marker
    clickable
    options={{ icon: props.icon, }}
    onClick={props.handleMarkerClick}
    position={props.position}
    visible={props.visible}
  >
    {props.selected &&
      props.visible && (
        // When we close the info window, we can assume the user no longer wants that buoy selected.
        // Dispatch an action to set selected buoy to null
        <InfoWindow onCloseClick={props.handleCloseClick}>
          <div className="sp-info-window">
            <h3 className="sp-info-title">Station ID: {props.buoyId}</h3>
            <button
              disabled={!props.user}
              className="sp-btn sp-btn-small buoy-favorite-btn"
              onClick={props.handleFavoriteClick}
            >
              {props.isFavorite ? 'Unfavorite' : 'Favorite'}
            </button>
            <p className="sp-info-text" dangerouslySetInnerHTML={{ __html: props.readings, }} />
          </div>
        </InfoWindow>
      )}
  </Marker>
);

CustomMarker.propTypes = {
  // Props
  icon: PropTypes.shape({
    fillColor: PropTypes.string,
    path: PropTypes.string,
    anchor: PropTypes.any,
    fillOpacity: PropTypes.number,
    strokeWeight: PropTypes.number,
    strokeColor: PropTypes.string,
    scale: PropTypes.number,
  }).isRequired,
  selected: PropTypes.bool.isRequired,
  position: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  visible: PropTypes.bool.isRequired,
  readings: PropTypes.string.isRequired,
  buoyId: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  user: PropTypes.instanceOf(Object),

  // Functions and dispatchers
  handleMarkerClick: PropTypes.func.isRequired,
  handleCloseClick: PropTypes.func.isRequired,
  handleFavoriteClick: PropTypes.func.isRequired,
};

CustomMarker.defaultProps = {
  user: null,
};

export default CustomMarker;
