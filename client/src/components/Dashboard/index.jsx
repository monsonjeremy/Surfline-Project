import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/Dashboard/Dashboard.css';

/**
 * @description Dashboard component represents the view for the Dashboard component which 
 * contains logic for change from ALL to FAV filters on the buoys
 *
 * @param {object} props - Props
 * @param {any} props.children - The children to render as a child of this component
 * @param {boolean} props.filterFavorites - Whether or not we are filtering favorite buoys
 * @param {boolean} props.loggedIn - Users login status
 * @param {function} props.dispatchShowAllBuoys - Function to dispatch an action to show all buoys
 * @param {function} props.dispatchShowFavBuoys - Function to dispatch an action to show favorite buoys
 * 
 * @returns {<Dashboard />}
 */
const Dashboard = props => (
  <div className={'sp-container sp-gray-bg dashboard-container'}>
    <hr className="sp-hr" />
    <h3 className={'instruction-sub-text text-center'}>
      Click a marker on the map or click a box in the list below to select a buoy
      {props.user ? ', see readings, and favorite.' : ' and see readings.'}
    </h3>
    <hr className="sp-hr" />
    <p className="text-center">
      Current latitude: <strong>{Math.round(100 * props.center.lat) / 100}</strong>
      <br />Current longitude: <strong>{Math.round(100 * props.center.lng) / 100}</strong>
      <br />Current radius: <strong>{props.radius}</strong>
    </p>
    <form className="sp-form-container" id="lat-lng-radius" onSubmit={props.handleFormSubmit}>
      <fieldset>
        <label className="sp-label" htmlFor="latitude">
          Latitude (South is negative):
        </label>
        <input
          onChange={props.handleFormEnable}
          className="sp-input"
          placeholder="Enter a latitude..."
          type="number"
          name="latitude"
          step="any"
        />
        <div className="focus-border" />
      </fieldset>
      <fieldset>
        <label className="sp-label" htmlFor="longitude">
          Longitude (West is negative):
        </label>
        <input
          onChange={props.handleFormEnable}
          className="sp-input"
          placeholder="Enter a longitude..."
          type="number"
          name="longitude"
          step="any"
        />
        <div className="focus-border" />
      </fieldset>
      <fieldset>
        <label className="sp-label" htmlFor="radius">
          Radius:
        </label>
        <input
          onChange={props.handleFormEnable}
          className="sp-input"
          placeholder="Enter a radius..."
          type="number"
          step="any"
          name="radius"
        />
        <div className="focus-border" />
      </fieldset>
    </form>
    <button
      type="submit"
      disabled={!props.formSubmitEnabled}
      form="lat-lng-radius"
      className={`sp-btn sp-btn-small lat-lng-radius-btn`}
    >
      Update
    </button>
    <div className={'sp-button-group'}>
      <button
        className={`sp-btn ${props.filterFavorites ? '' : 'sp-btn-selected'}`}
        onClick={props.handleShowAllBuoys}
      >
        All Buoys
      </button>
      <button
        disabled={!props.loggedIn}
        className={`sp-btn ${props.filterFavorites ? 'sp-btn-selected' : ''}`}
        onClick={props.handleShowFavBuoys}
      >
        Favorites
      </button>
    </div>
    {props.children}
  </div>
);

Dashboard.propTypes = {
  // Props
  children: PropTypes.node,
  filterFavorites: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  formSubmitEnabled: PropTypes.bool.isRequired,
  radius: PropTypes.number.isRequired,
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  user: PropTypes.instanceOf(Object),

  // Functions and dispatchers
  handleFormSubmit: PropTypes.func.isRequired,
  handleFormEnable: PropTypes.func.isRequired,
  handleShowAllBuoys: PropTypes.func.isRequired,
  handleShowFavBuoys: PropTypes.func.isRequired,
};

Dashboard.defaultProps = {
  children: null,
  user: null,
};

export default Dashboard;
