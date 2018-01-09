import React from 'react';
import PropTypes from 'prop-types';

// Styles
import '../../styles/Footer/Footer.css';

/**
 * @description Footer component represents the view for the Footer container which 
 * contains logic for showing the login/create account modals and logging a user out.
 *
 * @param {object} props - Props
 * @param {string} props.userError - User related error message to be displayed if not null
 * @param {string} props.dataError - Data related error message to be displayed if not null
 * @param {function} props.dispatchShowModal - Function to dispatch and action to show a modal
 * @param {boolean} props.loggedIn - Users login status
 * @param {object} props.user - User object
 * @param {string} props.user.username - Current user's username
 * 
 * @returns {<Footer />}
 */
const Footer = props => (
  <div className="sp-container footer-container">
    <div className={props.loggedInStyle}>
      <h3 className="text-center">Logged in as {props.user ? props.user.username : ''}</h3>
      <button
        disabled={!props.loggedIn}
        onClick={props.handleSignOutClick}
        className={`sp-btn sp-btn-small`}
      >
        Logout
      </button>
    </div>
    <div className={props.loggedOutStyle}>
      <h3 className="text-center">Sign in or create an account to favorite buoys!</h3>
      <div className="sp-button-group">
        <button
          disabled={props.loggedIn}
          onClick={props.handleSignInClick}
          className={`sp-btn sp-btn-small`}
        >
          Sign In
        </button>
        <button
          disabled={props.loggedIn}
          onClick={props.handleCreateAccountClick}
          className={`sp-btn sp-btn-small`}
        >
          Create Account
        </button>
      </div>
    </div>
  </div>
);

Footer.propTypes = {
  // Props
  loggedIn: PropTypes.bool.isRequired,
  loggedInStyle: PropTypes.string.isRequired,
  loggedOutStyle: PropTypes.string.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
  }),

  // Functions and dispatchers
  handleCreateAccountClick: PropTypes.func.isRequired,
  handleSignInClick: PropTypes.func.isRequired,
  handleSignOutClick: PropTypes.func.isRequired,
};

Footer.defaultProps = {
  user: null,
};

export default Footer;
