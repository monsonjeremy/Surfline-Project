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
    const props = {
      ...this.props,
      handleCreateAccountClick: this.handleCreateAccountClick,
      handleSignInClick: this.handleSignInClick,
    };
    return <HeaderView {...props} />;
  }
}

Header.propTypes = {
  dispatchShowModal: PropTypes.func.isRequired,
};

Header.defaultProps = {};

const mapStateToProps = state => ({
  ...state.User,
  userError: state.User.baseError,
  dataError: state.Data.buoy.baseError,
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
