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
  <div className={'sp-container sp-gray-bg'}>
    <h2 className={'text-center'}>Buoy Readings</h2>
    <p className={'instruction-sub-text text-center'}>
      Click a marker on the map, or click a box below to select a buoy and center it on the map.
    </p>
    <div className={'sp-button-group'}>
      <button
        className={`sp-btn ${props.filterFavorites ? '' : 'sp-btn-selected'}`}
        onClick={props.dispatchShowAllBuoys}
      >
        All Buoys
      </button>
      <button
        disabled={!props.loggedIn}
        className={`sp-btn ${props.filterFavorites ? 'sp-btn-selected' : ''}`}
        onClick={props.dispatchShowFavBuoys}
      >
        Favorites
      </button>
    </div>
    {props.children}
  </div>
);

Dashboard.propTypes = {
  children: PropTypes.node,
  dispatchShowAllBuoys: PropTypes.func.isRequired,
  dispatchShowFavBuoys: PropTypes.func.isRequired,
  filterFavorites: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

Dashboard.defaultProps = {
  children: null,
  user: null,
};

export default Dashboard;
