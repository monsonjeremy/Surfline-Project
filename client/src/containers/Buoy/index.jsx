import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

// Views
import BuoyView from '../../components/Buoy';

// Actions
import { addFavorite } from '../../reducers/User/actions';

/**
 * @description Buoy contains the logic for individual buoy in the list. It has logic to dispatch actions
 * when a user favorites/unfavorites a buoy
 *
 * @param {object} props - Component props
 *
 * @returns {<Buoy />}
 */
class Buoy extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <BuoyView {...this.props} />;
  }
}

Buoy.propTypes = {};

const mapDispatchToProps = dispatch => ({
  dispatchAddToFavorites: (userId, buoyId) => {
    dispatch(addFavorite(userId, buoyId));
  },
});

const mapStateToProps = state => ({
  ...state.User,
});

export default connect(mapStateToProps, mapDispatchToProps)(Buoy);
