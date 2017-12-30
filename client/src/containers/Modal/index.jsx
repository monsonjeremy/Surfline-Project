import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Modal Containers
import CreateAccount from './CreateAccount';
import SignIn from './SignIn';

// actions
import { hideModal } from '../../reducers/Modal/actions';

/**
 * @description Modal handles logic for display a Modal and content based on the currentModal state in the store
 *
 * @param {object} props - Component props
 * @param {string} props.currentModal - String passed in from the store state to determine which modal to render.
 * @param {function} props.dispatchHideModal - Method for dispatching an action to hide the modal.
 *
 * @returns {<Modal />}
 */
class Modal extends PureComponent {
  constructor(props) {
    super(props);

    // Bind functions to this context
    this.renderModal = this.renderModal.bind(this);
    this.handleBackgroundClick = this.handleBackgroundClick.bind(this);
  }

  // Method for hiding the modal when the semi-transparent background is clicked
  handleBackgroundClick(e) {
    // Ensure current target was clicked (avoid event bubbling bugs)
    if (e.target === e.currentTarget) this.props.dispatchHideModal();
  }

  // Logic for conditionally rendering modal content
  renderModal() {
    const modalProps = {
      ...this.props,
      handleBackgroundClick: this.handleBackgroundClick,
    };

    // Conditionally render the modals based on the redux store state
    switch (this.props.currentModal) {
      case 'SIGN_IN':
        return <SignIn {...modalProps} />;

      case 'CREATE_ACCOUNT':
        return <CreateAccount {...modalProps} />;

      default:
        return null;
    }
  }

  render() {
    return this.renderModal();
  }
}

Modal.propTypes = {
  // props
  currentModal: PropTypes.string,

  // functions & dispatchers
  dispatchHideModal: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  currentModal: null,
};

const mapStateToProps = state => ({
  currentModal: state.Modal.currentModal,
  modalError: state.User.modalError,
});

const mapDispatchToProps = dispatch => ({
  dispatchHideModal: () => {
    dispatch(hideModal());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
