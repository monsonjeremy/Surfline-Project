import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Polyfill for using FormData on safari IE and other unsupported browsers
import 'formdata-polyfill';

// Components
import ModalWrapper from '../../components/Modal';
import CreateAccountView from '../../components/Modal/CreateAccount';

// actions
import { hideModal, dispatchShowModal } from '../../reducers/Modal/actions';
import { createNewUser } from '../../reducers/User/actions/index';

/**
 * @description CreateAccount handles logic for Creating An Account from the CreateAccount Modal
 *
 * @param {object} props - Component props
 * @param {function} props.dispatchHideModal - Method for dispatching an action to hide the modal.
 * @param {function} props.dispatchShowModal - Method for dispatching an action to show a specific modal.
 * @param {function} props.dispatchCreateAccount - Method for dispatching an action to create a new account.
 *
 * @returns {<CreateAccount />}
 */
class CreateAccount extends PureComponent {
  constructor(props) {
    super(props);

    this.handleCreateAccountClick = this.handleCreateAccountClick.bind(this);
    this.handleSignInClick = this.handleSignInClick.bind(this);
  }

  handleSignInClick() {
    this.props.dispatchShowModal('SIGN_IN');
  }

  handleCreateAccountClick(event) {
    event.preventDefault();
    event.stopPropagation();
    const data = new FormData(event.target);
    this.props.dispatchCreateUser(data);
  }

  render() {
    // Define props to pass to <CreateAccountView />
    const createAccountProps = {
      ...this.props,
      handleCreateAccountClick: this.handleCreateAccountClick,
      handleSignInClick: this.handleSignInClick,
      handleBackgroundClick: this.props.handleBackgroundClick,
    };

    return (
      <ModalWrapper {...this.props} title="Create Account">
        <CreateAccountView {...createAccountProps} />
      </ModalWrapper>
    );
  }
}

CreateAccount.propTypes = {
  handleBackgroundClick: PropTypes.func.isRequired,
  dispatchShowModal: PropTypes.func.isRequired,
  dispatchHideModal: PropTypes.func.isRequired,
  dispatchCreateUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  dispatchHideModal: () => {
    dispatch(hideModal());
  },
  dispatchShowModal: modalType => {
    dispatch(dispatchShowModal(modalType));
  },
  dispatchCreateUser: data => {
    dispatch(createNewUser(data));
  },
});

export default connect(null, mapDispatchToProps)(CreateAccount);
