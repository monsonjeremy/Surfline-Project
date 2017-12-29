import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/Dashboard/Dashboard.css';

const Dashboard = ({
  dispatchShowAllBuoys,
  dispatchShowFavBuoys,
  children,
  filterFavorites,
  loggedIn,
}) => (
  <div className={'sp-container sp-gray-bg'}>
    <h2 className={'sp-content-title sp-text-center'}>Buoy Readings</h2>
    <div className={'sp-button-group'}>
      <button
        className={`sp-btn ${filterFavorites ? '' : 'sp-btn-selected'}`}
        onClick={dispatchShowAllBuoys}
      >
        All Buoys
      </button>
      <button
        disabled={!loggedIn}
        className={`sp-btn ${filterFavorites ? 'sp-btn-selected' : ''}`}
        onClick={dispatchShowFavBuoys}
      >
        Favorites
      </button>
    </div>
    {children}
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
