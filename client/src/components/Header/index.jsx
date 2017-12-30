import React from 'react';
import PropTypes from 'prop-types';

// Styles
import '../../styles/Header/Header.css';

const HeaderView = props => (
  <div className="sp-container header-container">
    {(props.userError || props.dataError) && (
      <div className="sp-header-error">
        <span className="sp-error-msg">{props.userError || props.dataError}</span>
      </div>
    )}
    {props.loggedIn ? (
      <h3 className="text-center">Logged in as {props.user.username}</h3>
    ) : (
      <h3 className="text-center">Sign in or create an account to favorite buoys</h3>
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
  // Props
  loggedIn: PropTypes.bool.isRequired,
  userError: PropTypes.string,
  dataError: PropTypes.string,
  user: PropTypes.shape({
    username: PropTypes.string,
  }),

  // Functions and dispatchers
  dispatchShowModal: PropTypes.func.isRequired,
  dispatchLogoutUser: PropTypes.func.isRequired,
};

HeaderView.defaultProps = {
  userError: null,
  dataError: null,
  user: null,
};

export default HeaderView;
