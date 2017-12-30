import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

// View
import HeaderView from '../../components/Header';

// actions
import { hideModal, dispatchShowModal } from '../../reducers/Modal/actions';
import { logOutUser } from '../../reducers/User/actions';
import { showAllBuoys } from '../../reducers/Data/actions';

/**
 * @description NavBar handles logic for buttons on the NavBar and their text
 *
 * @param {object} props - Component props
 * @param {boolean} props.dataError - Error message for data actions
 * @param {boolean} props.userError - Error message for user actions
 * @param {function} props.dispatchHideModal - Method for dispatching an action to hide the modal.
 * @param {function} props.dispatchShowModal - Method for dispatching an action to show a specific modal.
 * @param {function} props.dispatchLogoutUser - Method for dispatching an action to kill a user session.
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

Header.propTypes = {};

Header.defaultProps = {};

const mapStateToProps = state => ({
  ...state.User,
  userError: state.User.baseError,
  dataError: state.Data.baseError,
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
