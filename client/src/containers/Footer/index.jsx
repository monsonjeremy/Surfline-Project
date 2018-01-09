import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// View
import FooterView from '../../components/Footer';

// actions
import { hideModal, dispatchShowModal } from '../../reducers/Modal/actions';
import { logOutUser } from '../../reducers/User/actions';
import { showAllBuoys, hydrateBuoyData } from '../../reducers/Data/actions';

/**
 * @description Footer handles logic for buttons on the NavBar and their text
 *
 * @param {object} props - Component props
 * @param {function} props.dispatchHideModal - Method for dispatching an action to hide the modal.
 * @param {function} props.dispatchShowModal - Method for dispatching an action to show a specific modal.
 * @param {function} props.dispatchLogoutUser - Method for dispatching an action to kill a user session.
 *
 * @returns {<Footer />}
 */
class Footer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleCreateAccountClick = this.handleCreateAccountClick.bind(this);
    this.handleSignInClick = this.handleSignInClick.bind(this);
    this.handleSignOutClick = this.handleSignOutClick.bind(this);
  }

  handleCreateAccountClick() {
    this.props.dispatchShowModal('CREATE_ACCOUNT');
  }

  handleSignInClick() {
    this.props.dispatchShowModal('SIGN_IN');
  }

  handleSignOutClick() {
    const { lat, lng, } = this.props.center;
    const { radius, } = this.props;
    const filterFavorites = false;
    this.props.dispatchLogoutUser(lat, lng, radius, filterFavorites);
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
      handleSignOutClick: this.handleSignOutClick,
      loggedInStyle,
      loggedOutStyle,
    };

    return <FooterView {...props} />;
  }
}

Footer.propTypes = {
  // Props
  loggedIn: PropTypes.bool,
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  radius: PropTypes.number.isRequired,

  // Functions and dispatchers
  dispatchShowModal: PropTypes.func.isRequired,
  dispatchLogoutUser: PropTypes.func.isRequired,
};

Footer.defaultProps = {
  loggedIn: false,
};

const mapStateToProps = state => ({
  ...state.User,
  ...state.Data,
  ...state.Maps,
});

const mapDispatchToProps = dispatch => ({
  dispatchHideModal: () => {
    dispatch(hideModal());
  },
  dispatchShowModal: modalType => {
    dispatch(dispatchShowModal(modalType));
  },
  dispatchLogoutUser: async (lat, lng, radius, favoritesOnly) => {
    await dispatch(logOutUser());
    await dispatch(showAllBuoys());
    dispatch(hydrateBuoyData(lat, lng, radius, favoritesOnly));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
