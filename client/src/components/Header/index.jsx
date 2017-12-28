import React from 'react';
import PropTypes from 'prop-types';

// Styles
import '../../particles/Header/Header.css';

const HeaderView = props => (
  <div className="auth-container">
    {props.loggedIn && <h3>Logged in as {props.user.username}</h3>}
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
  }).isRequired,
  dispatchShowModal: PropTypes.func.isRequired,
  // children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

HeaderView.defaultProps = {
  children: null,
};

export default HeaderView;
