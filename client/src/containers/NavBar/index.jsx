import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import { NavBarView, NavItem, NavDivider } from '../../components/NavBar';

// actions
import { hideModal, dispatchShowModal } from '../../reducers/Modal/actions';
import { logOutUser } from '../../reducers/Authentication/actions';

/**
 * @description NavBar handles logic for buttons on the NavBar and their text
 *
 * @param {object} props - Component props
 * @param {boolean} props.loggedIn - Boolean flag for determining logged in status
 * @param {boolean} props.loggedInUser - Object for information about the current user
 * @param {boolean} props.loggedInUser.firstName - Current user's first name
 * @param {boolean} props.loggedInUser.lastName - Current user's last name
 * @param {function} props.dispatchHideModal - Method for dispatching an action to hide the modal.
 * @param {function} props.dispatchShowModal - Method for dispatching an action to show a specific modal.
 *
 * @returns {<SignIn />}
 */
class NavBar extends PureComponent {
  constructor(props) {
    super(props);

    this.renderLeftNavItem = this.renderLeftNavItem.bind(this);
    this.renderRightNavItem = this.renderRightNavItem.bind(this);
  }

  renderLeftNavItem() {
    // Handle the click on left nav item based on user sign in status
    const handleClick = () =>
      this.props.loggedIn ? null : this.props.dispatchShowModal('SIGN_IN');

    return (
      <NavItem onClick={handleClick}>
        {this.props.loggedIn ? `Logged in as ${this.props.user.username}` : 'Login'}
      </NavItem>
    );
  }

  renderRightNavItem() {
    // Handle the click on right nav item based on user sign in status
    const handleClick = () =>
      this.props.loggedIn
        ? this.props.dispatchLogoutUser()
        : this.props.dispatchShowModal('CREATE_ACCOUNT');

    return (
      <NavItem onClick={handleClick}>{this.props.loggedIn ? 'Sign Out' : 'Create Account'}</NavItem>
    );
  }

  render() {
    return (
      <NavBarView>
        {this.renderLeftNavItem()}
        <NavDivider />
        {this.renderRightNavItem()}
      </NavBarView>
    );
  }
}

NavBar.propTypes = {
  loggedIn: PropTypes.bool,
  user: PropTypes.shape({
    username: PropTypes.string,
  }),
  dispatchShowModal: PropTypes.func.isRequired,
  dispatchLogoutUser: PropTypes.func.isRequired,
};

NavBar.defaultProps = {
  user: {},
  loggedIn: false,
};

const mapStateToProps = state => ({
  ...state.Authentication,
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
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
