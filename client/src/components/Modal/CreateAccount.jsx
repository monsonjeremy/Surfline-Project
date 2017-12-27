import React from 'react';
import PropTypes from 'prop-types';

const CreateAccount = props => (
  <div className={props.styles}>
    <form onSubmit={props.createAccount}>
      <input type="text" placeholder="Your Name" name="name" autoComplete="name" />
      <br />
      <input type="email" placeholder="Email" name="email" autoComplete="username email" />
      <br />
      <input type="password" placeholder="Password" name="password" autoComplete="new-password" />
      <br />
      <button>Create account</button>
    </form>
    <hr />
    {console.log(props)}
    Already have an account?{' '}
    <button
      className="bt-nav-link"
      role="menuitem"
      onClick={() => props.dispatchShowModal('SIGN_IN')}
    >
      Login
    </button>
  </div>
);

CreateAccount.propTypes = {
  styles: PropTypes.string,
  createAccount: PropTypes.func.isRequired,
  dispatchShowModal: PropTypes.func.isRequired,
  // dispatchHideModal: PropTypes.func.isRequired,
};

CreateAccount.defaultProps = {
  styles: '',
};

export default CreateAccount;
