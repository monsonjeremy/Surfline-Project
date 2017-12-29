import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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

    this.createUser = this.createUser.bind(this);
  }

  createUser(event) {
    event.preventDefault();
    event.stopPropagation();
    const data = new FormData(event.target);
    this.props.dispatchCreateUser(data);
    this.props.dispatchHideModal();
  }

  render() {
    // Define props to pass to <CreateAccountView />
    const createAccountProps = {
      ...this.props,
      createUser: this.createUser,
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

// eslint-disable-next-line
const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);
