import React from 'react';
import PropTypes from 'prop-types';

// Styles
import '../../styles/Header/Header.css';

/**
 * @description Header component represents the view for the Header container which 
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
 * @returns {<Header />}
 */
const Header = props => (
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
        onClick={props.handleSignInClick}
        className={`sp-btn sp-btn-small ${!props.loggedIn ? '' : 'sp-btn-hide'}`}
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
        onClick={props.handleCreateAccountClick}
        className={`sp-btn sp-btn-small ${!props.loggedIn ? '' : 'sp-btn-hide'}`}
      >
        Create Account
      </button>
    </div>
  </div>
);

Header.propTypes = {
  // Props
  loggedIn: PropTypes.bool.isRequired,
  userError: PropTypes.string,
  dataError: PropTypes.string,
  user: PropTypes.shape({
    username: PropTypes.string,
  }),

  // Functions and dispatchers
  handleCreateAccountClick: PropTypes.func.isRequired,
  handleSignInClick: PropTypes.func.isRequired,
  dispatchLogoutUser: PropTypes.func.isRequired,
};

Header.defaultProps = {
  userError: null,
  dataError: null,
  user: null,
};

export default Header;
