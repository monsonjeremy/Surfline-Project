import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description CreateAccount component represents the view for the create account version of the Modal component
 * 
 * @param {object} props - Props
 * @param {function} props.createUser - Function for dispatching actions to create a user
 * @param {function} props.dispatchShowModal - Function to dispatch action to show a given modal
 * 
 * @returns {<CreateAccount />}
 */
const CreateAccount = props => (
  <div className="sp-modal-form">
    <form
      className="sp-form-container"
      id="create-account"
      onSubmit={props.handleCreateAccountClick}
    >
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
        <button type="submit" form="create-account" className="sp-btn sp-btn-lrg">
          Submit
        </button>
        <button className="sp-btn sp-btn-lrg" role="menuitem" onClick={props.handleSignInClick}>
          Sign In
        </button>
      </div>
    </form>
  </div>
);

CreateAccount.propTypes = {
  handleCreateAccountClick: PropTypes.func.isRequired,
  handleSignInClick: PropTypes.func.isRequired,
};

CreateAccount.defaultProps = {};

export default CreateAccount;
