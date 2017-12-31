import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Polyfill for using FormData on safari IE and other unsupported browsers
import 'formdata-polyfill';

// Components
import ModalWrapper from '../../components/Modal';
import SignInView from '../../components/Modal/SignIn';

// actions
import { hideModal, dispatchShowModal } from '../../reducers/Modal/actions';
import { logInUser } from '../../reducers/User/actions/index';

/**
 * @description SignIn handles logic for Signing a user in from the SignIn Modal
 *
 * @param {object} props - Component props
 * @param {function} props.dispatchHideModal - Method for dispatching an action to hide the modal.
 * @param {function} props.dispatchShowModal - Method for dispatching an action to show a specific modal.
 * @param {function} props.dispatchSignIn - Method for dispatching an action to attempt to sign in a user.
 *
 * @returns {<SignIn />}
 */
class SignIn extends PureComponent {
  constructor(props) {
    super(props);

    this.handleCreateAccountClick = this.handleCreateAccountClick.bind(this);
    this.handleSignInClick = this.handleSignInClick.bind(this);
  }

  handleCreateAccountClick() {
    this.props.dispatchShowModal('CREATE_ACCOUNT');
  }

  // Grab the form data and send a request to sign the user in
  handleSignInClick(event) {
    event.preventDefault();
    event.stopPropagation();
    const data = new FormData(event.target);
    this.props.dispatchSignIn(data);
  }

  render() {
    // Define props to pass to <SignInView />
    const signInProps = {
      ...this.props,
      handleCreateAccountClick: this.handleCreateAccountClick,
      handleSignInClick: this.handleSignInClick,
      handleBackgroundClick: this.props.handleBackgroundClick,
    };

    return (
      <ModalWrapper {...this.props} title="Sign in">
        <SignInView {...signInProps} />
      </ModalWrapper>
    );
  }
}

SignIn.propTypes = {
  handleBackgroundClick: PropTypes.func.isRequired,
  dispatchShowModal: PropTypes.func.isRequired,
  dispatchHideModal: PropTypes.func.isRequired,
  dispatchSignIn: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  dispatchHideModal: () => {
    dispatch(hideModal());
  },
  dispatchShowModal: modalType => {
    dispatch(dispatchShowModal(modalType));
  },
  dispatchSignIn: data => {
    dispatch(logInUser(data));
  },
});

export default connect(null, mapDispatchToProps)(SignIn);
