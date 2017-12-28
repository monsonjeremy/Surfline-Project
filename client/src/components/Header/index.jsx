import React from 'react';
import PropTypes from 'prop-types';

// Styles
import '../../particles/Header/Header.css';

const HeaderView = props => (
  <div className="auth-container">
    {props.loggedIn && <h5>Logged in as {props.user.username}</h5>}
    {!props.loggedIn && [
      <button className="sp-btn sp-btn-small">Sign In</button>,
      <button className="sp-btn sp-btn-small">Create Account</button>
    ]}
    {props.loggedIn && <button className="sp-btn sp-btn-small">Logout</button>}
  </div>
);

HeaderView.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
  }).isRequired,
  // children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

HeaderView.defaultProps = {
  children: null,
};

export default HeaderView;
