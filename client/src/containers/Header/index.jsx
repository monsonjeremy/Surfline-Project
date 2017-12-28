import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// View
import HeaderView from '../../components/Header';

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
class Header extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return <HeaderView {...this.props} />;
  }
}

Header.propTypes = {
  loggedIn: PropTypes.bool,
  user: PropTypes.shape({
    username: PropTypes.string,
  }),
  dispatchShowModal: PropTypes.func.isRequired,
  dispatchLogoutUser: PropTypes.func.isRequired,
};

Header.defaultProps = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
