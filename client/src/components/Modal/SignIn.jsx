import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description SignIn component represents the view for the create account version of the Modal component
 * 
 * @param {object} props - Props
 * @param {function} props.signIn - Function for dispatching actions to sign in a user
 * @param {function} props.dispatchShowModal - Function to dispatch action to show a given modal
 * 
 * @returns {<SignIn />}
 */
const SignIn = props => (
  <div className="sp-modal-form">
    <form className="sp-form-container" onSubmit={props.signIn}>
      <fieldset>
        <input
          className="sp-input"
          type="username"
          placeholder="Username"
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
          placeholder="Password"
          name="password"
          autoComplete="current-password"
          required
        />
        <div className="focus-border" />
      </fieldset>
      <br />
      <div className="sp-button-group">
        <button className="sp-btn sp-btn-lrg">Submit</button>
        <button
          className="sp-btn sp-btn-lrg"
          onClick={() => {
            props.dispatchShowModal('CREATE_ACCOUNT');
          }}
        >
          Create an account
        </button>
      </div>
    </form>
  </div>
);

SignIn.propTypes = {
  dispatchShowModal: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
};

SignIn.defaultProps = {};

export default SignIn;
