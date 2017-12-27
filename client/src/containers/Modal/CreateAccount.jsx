import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import ModalWrapper from '../../components/Modal';
import CreateAccountView from '../../components/Modal/CreateAccount';

// actions
import { hideModal, dispatchShowModal } from '../../reducers/Modal/actions';

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

    this.create = this.create.bind(this);
  }

  create(event) {
    this.props.dispatchHideModal();
    this.props.createAccount(event);
  }

  render() {
    // Define props to pass to <CreateAccountView />
    const createAccountProps = {
      ...this.props,
      createAccount: this.create,
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
  hideModal: PropTypes.func.isRequired,
  createAccount: PropTypes.func.isRequired,
  dispatchShowModal: PropTypes.func.isRequired,
  dispatchHideModal: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);
