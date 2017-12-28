import React from 'react';
import PropTypes from 'prop-types';

import '../../particles/Dashboard/Dashboard.css';

const Dashboard = ({
  dispatchShowAllBuoys,
  dispatchShowFavBuoys,
  children,
  filterFavorites,
  user,
  dispatchShowModal,
}) => (
  <div className={'sp-main-container sp-gray-bg sp-full-height'}>
    <h2 className={'sp-content-title sp-text-center'}>Buoy Readings</h2>
    <div className={'sp-button-group'}>
      <button
        className={`sp-btn ${filterFavorites ? '' : 'sp-btn-selected'}`}
        onClick={dispatchShowAllBuoys}
      >
        All Buoys
      </button>
      <button
        disabled
        className={`sp-btn ${filterFavorites ? 'sp-btn-selected' : ''}`}
        onClick={dispatchShowFavBuoys}
      >
        Favorites
      </button>
    </div>
    {!user && (
      <p>
        <a role="button" onClick={() => dispatchShowModal('SIGN_IN')}>
          Sign in
        </a>{' '}
        or{' '}
        <a role="button" onClick={() => dispatchShowModal('SIGN_IN')}>
          create an account
        </a>{' '}
        to favorite buoys
      </p>
    )}
    {children}
  </div>
);

Dashboard.propTypes = {
  children: PropTypes.node,
  dispatchShowAllBuoys: PropTypes.func.isRequired,
  dispatchShowFavBuoys: PropTypes.func.isRequired,
  dispatchShowModal: PropTypes.func.isRequired,
  filterFavorites: PropTypes.bool.isRequired,
  user: PropTypes.instanceOf(Object),
};

Dashboard.defaultProps = {
  children: null,
  user: null,
};

export default Dashboard;
