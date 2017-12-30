import React from 'react';
import PropTypes from 'prop-types';

const CreateAccount = props => (
  <div className="sp-modal-form">
    <form className="sp-form-container" onSubmit={props.createUser}>
      <fieldset>
        <input
          className="sp-input"
          type="username"
          placeholder="Choose a username"
          name="username"
          autoComplete="username"
          required
        />
        <div className="focus-border" />
      </fieldset>
      <br />
      <fieldset>
        <input
          className="sp-input"
          type="password"
          placeholder="Choose a password"
          name="password"
          autoComplete="new-password"
          required
        />
        <div className="focus-border" />
      </fieldset>
      <br />
      <div className="sp-button-group">
        <button className="sp-btn sp-btn-lrg">Submit</button>
        <button
          className="sp-btn sp-btn-lrg"
          role="menuitem"
          onClick={() => props.dispatchShowModal('SIGN_IN')}
        >
          Sign In
        </button>
      </div>
    </form>
  </div>
);

CreateAccount.propTypes = {
  createUser: PropTypes.func.isRequired,
  dispatchShowModal: PropTypes.func.isRequired,
};

CreateAccount.defaultProps = {
  styles: '',
};

export default CreateAccount;
