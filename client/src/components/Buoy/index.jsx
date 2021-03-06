import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description Buoy component represents the view for the buoy info container in the sidebar.
 *
 * @param {object} props - Props
 * @param {string} props.buoyId - The ID for the buoy
 * @param {function} props.dispatchSelectBuoy - Click Handler for dispatching action to select a buoy
 * @param {function} props.dispatchAddToFavorites - Click Handler for dispatching action to add a buoy to favorites
 * @param {number} props.lat - Latitude of the buoy
 * @param {number} props.lng - Longitude of the buoy
 * @param {string} props.title - Title of the buoy
 * @param {string} props.link - Link to the buoy webpage
 * @param {string} props.readings - Readings on the buoy
 * @param {boolean} props.showFavorites - Whether or not the application state is showing the favorite buoys only
 * @param {boolean} props.isFavorite - Whether or not the current buoy is a favorite
 * @param {object} props.user - The current user object
 * @param {string} props.user.userId - The current user's userId
 * 
 * @returns {<Buoy />}
 *
 */
const Buoy = props => (
  <div role="button" onClick={props.buoyClickHandler} className={'buoy-container'}>
    <h3 className="buoy-title text-center">{props.title}</h3>
    <h3 className="buoy-id text-center">Station ID: {props.buoyId}</h3>
    <button
      disabled={!props.user}
      className="sp-btn sp-btn-small buoy-favorite-btn"
      onClick={props.favoriteClickHandler}
    >
      {props.isFavorite ? 'Unfavorite' : 'Favorite'}
    </button>
    <p className="buoy-lat-long">
      Latitude: {props.lat} | Longitude: {props.lng}
    </p>
    <a className="buoy-link" target="_blank" href={props.link}>
      Buoy Link
    </a>
    <p className="buoy-readings" dangerouslySetInnerHTML={{ __html: props.readings, }} />
  </div>
);

Buoy.propTypes = {
  // Props
  title: PropTypes.string.isRequired,
  buoyId: PropTypes.string.isRequired,
  readings: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool,
  user: PropTypes.instanceOf(Object),

  // Functions and Dispatchers
  favoriteClickHandler: PropTypes.func.isRequired,
  buoyClickHandler: PropTypes.func.isRequired,
};

Buoy.defaultProps = {
  isFavorite: false,
  user: null,
  showFavorites: false,
};

export default Buoy;
