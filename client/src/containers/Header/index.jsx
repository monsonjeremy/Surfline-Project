import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// View
import HeaderView from '../../components/Header';

// actions
import { hideModal, dispatchShowModal } from '../../reducers/Modal/actions';
import { logOutUser } from '../../reducers/User/actions';
import { showAllBuoys } from '../../reducers/Data/actions';

/**
 * @description Header handles logic for buttons on the NavBar and their text
 *
 * @param {object} props - Component props
 * @param {boolean} props.dataError - Error message for data actions
 * @param {boolean} props.userError - Error message for user actions
 * @param {function} props.dispatchHideModal - Method for dispatching an action to hide the modal.
 * @param {function} props.dispatchShowModal - Method for dispatching an action to show a specific modal.
 * @param {function} props.dispatchLogoutUser - Method for dispatching an action to kill a user session.
 *
 * @returns {<Header />}
 */
class Header extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleCreateAccountClick = this.handleCreateAccountClick.bind(this);
    this.handleSignInClick = this.handleSignInClick.bind(this);
  }

  handleCreateAccountClick() {
    this.props.dispatchShowModal('CREATE_ACCOUNT');
  }

  handleSignInClick() {
    this.props.dispatchShowModal('SIGN_IN');
  }

  render() {
    // Apply default styles to the footer
    let loggedInStyle = 'translate-content-wrapper logged-in ';
    let loggedOutStyle = 'translate-content-wrapper logged-out ';

    // If the user logs in, animate the components accordingly
    if (this.props.loggedIn) {
      loggedInStyle += 'translate-right';
      loggedOutStyle += 'translate-right';
    }

    // Create the props object
    const props = {
      ...this.props,
      handleCreateAccountClick: this.handleCreateAccountClick,
      handleSignInClick: this.handleSignInClick,
      loggedInStyle,
      loggedOutStyle,
    };

    return <HeaderView {...props} />;
  }
}

Header.propTypes = {
  // Props
  loggedIn: PropTypes.bool,

  // Functions and dispatchers
  dispatchShowModal: PropTypes.func.isRequired,
};

Header.defaultProps = {
  loggedIn: false,
};

const mapStateToProps = state => ({
  ...state.User,
});

const mapDispatchToProps = dispatch => ({
  dispatchHideModal: () => {
    dispatch(hideModal());
  },
  dispatchShowModal: modalType => {
    dispatch(dispatchShowModal(modalType));
  },
  dispatchLogoutUser: () => {
    dispatch(logOutUser());
    dispatch(showAllBuoys());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
