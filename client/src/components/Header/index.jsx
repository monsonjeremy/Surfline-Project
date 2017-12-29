import React from 'react';
import PropTypes from 'prop-types';

// Styles
import '../../styles/Header/Header.css';

const HeaderView = props => (
  <div className="sp-container header-container">
    {props.loggedIn ? (
      <h3>Logged in as {props.user.username}</h3>
    ) : (
      <h3>Sign in or create an account to favorite buoys</h3>
    )}
    <div className="sp-button-group">
      <button
        disabled={props.loggedIn}
        onClick={() => props.dispatchShowModal('SIGN_IN')}
        className={`sp-btn sp-btn-small ${props.loggedIn ? 'sp-btn-hide' : ''}`}
      >
        Sign In
      </button>
      <button
        disabled={!props.loggedIn}
        onClick={props.dispatchLogoutUser}
        className={`sp-btn sp-btn-small ${props.loggedIn ? '' : 'sp-btn-hide'}`}
      >
        Logout
      </button>
      <button
        disabled={props.loggedIn}
        onClick={() => props.dispatchShowModal('CREATE_ACCOUNT')}
        className={`sp-btn sp-btn-small ${props.loggedIn ? 'sp-btn-hide' : ''}`}
      >
        Create Account
      </button>
    </div>
  </div>
);

HeaderView.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
  }),
  dispatchShowModal: PropTypes.func.isRequired,
  dispatchLogoutUser: PropTypes.func.isRequired,
};

HeaderView.defaultProps = {
  user: null,
};

export default HeaderView;
