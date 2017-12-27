import React from 'react';
import PropTypes from 'prop-types';

const SignIn = props => (
  <div className={props.styles}>
    <form onSubmit={props.signIn}>
      <input type="email" placeholder="Email" name="email" autoComplete="username email" />
      <br />
      <input
        type="password"
        placeholder="Password"
        name="password"
        autoComplete="current-password"
      />
      <br />
      <button>Sign in</button>
    </form>
    <h3>Don&#39;t have an account? </h3>
    <a
      className="bt-nav-link"
      role="menuitem"
      onClick={() => {
        props.dispatchShowModal('CREATE_ACCOUNT');
      }}
    >
      Create one
    </a>
  </div>
);

SignIn.propTypes = {
  styles: PropTypes.string,
  // dispatchHideModal: PropTypes.func.isRequired,
  dispatchShowModal: PropTypes.func.isRequired,
  // dispatchLoginUser: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
};

SignIn.defaultProps = {
  styles: '',
};

export default SignIn;
