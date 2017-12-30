import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

// Views
import BuoyView from '../../components/Buoy';

// Actions
import { addFavorite } from '../../reducers/User/actions';
import { selectBuoy } from '../../reducers/Data/actions';
import { updateMapCenterAndZoom } from '../../reducers/Maps/actions';

/**
 * @description Buoy contains the logic for individual buoy in the list. It has logic to dispatch actions
 * when a user favorites/unfavorites a buoy or when a user clicks the box to select the buoy on the map
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

const mapDispatchToProps = dispatch => ({
  dispatchAddToFavorites: (event, userId, buoyId) => {
    event.stopPropagation();
    dispatch(addFavorite(userId, buoyId));
  },
  dispatchSelectBuoy: (event, buoyId, center, zoom) => {
    event.stopPropagation();
    dispatch(selectBuoy(buoyId));
    dispatch(updateMapCenterAndZoom(center, zoom));
  },
});

const mapStateToProps = state => ({
  ...state.User,
});

export default connect(mapStateToProps, mapDispatchToProps)(Buoy);
