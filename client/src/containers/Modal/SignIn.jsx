import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import ModalWrapper from '../../components/Modal';
import SignInView from '../../components/Modal/SignIn';

// actions
import { hideModal, dispatchShowModal } from '../../reducers/Modal/actions';

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

    this.signIn = this.signIn.bind(this);
  }

  // Grab the form data and send a request to sign the user in
  signIn(event) {
    const data = new FormData(event.target);
    this.props.dispatchSignInUser(data);
    this.props.dispatchHideModal();
  }

  render() {
    // Define props to pass to <SignInView />
    const signInProps = {
      ...this.props,
      signIn: this.signIn,
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
  dispatchSignInUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  dispatchHideModal: () => {
    dispatch(hideModal());
  },
  dispatchShowModal: modalType => {
    dispatch(dispatchShowModal(modalType));
  },
});

// eslint-disable-next-line
const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
