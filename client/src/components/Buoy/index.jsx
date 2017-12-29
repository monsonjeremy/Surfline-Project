import React from 'react';
import PropTypes from 'prop-types';

const BuoyList = props => (
  <div className={'buoy-container'}>
    <h3 className="buoy-title text-center">{props.title}</h3>
    <h3 className="buoy-id text-center">Station ID: {props.buoyId}</h3>
    <p className="buoy-lat-long">
      Latitude: {props.lat} | Longitude: {props.long}
    </p>
    <a className="buoy-link" target="_blank" href={props.link}>
      Buoy Link
    </a>
    <div className="buoy-readings" dangerouslySetInnerHTML={{ __html: props.readings, }} />
    {!props.showFavorites && (
      <button
        disabled={props.isFavorite || !props.user}
        className="sp-btn"
        onClick={() => props.dispatchAddToFavorites(props.user.userId, props.buoyId)}
      >
        Favorite
      </button>
    )}
  </div>
);

BuoyList.propTypes = {
  title: PropTypes.string.isRequired,
  buoyId: PropTypes.string.isRequired,
  readings: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  lat: PropTypes.string.isRequired,
  long: PropTypes.string.isRequired,
  showFavorites: PropTypes.bool,
  isFavorite: PropTypes.bool,
  dispatchAddToFavorites: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Object),
};

BuoyList.defaultProps = {
  isFavorite: false,
  user: null,
  showFavorites: false,
};

export default BuoyList;
