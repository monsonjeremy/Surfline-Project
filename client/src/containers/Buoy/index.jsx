import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Views
import BuoyView from '../../components/Buoy';

// Actions
import { addFavorite, removeFavorite } from '../../reducers/User/actions';
import { selectBuoy } from '../../reducers/Data/actions';
import { updateMapCenterAndZoom } from '../../reducers/Maps/actions';

/**
 * @description Buoy container connects the Buoy components to the store 
 * and creates the dispatchers for when a user favorites/unfavorites a buoy or
 * when a user clicks the box to select the buoy on the map
 *
 * @param {object} props - Component props
 *
 * @returns {<Buoy />}
 */
class Buoy extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.favoriteClickHandler = this.favoriteClickHandler.bind(this);
    this.buoyClickHandler = this.buoyClickHandler.bind(this);
  }

  // Function for the logic regarding click the favorite/unfavorite button
  favoriteClickHandler(event) {
    if (this.props.isFavorite) {
      return this.props.dispatchRemoveFavorite(event, this.props.user.userId, this.props.buoyId);
    }
    return this.props.dispatchAddToFavorites(event, this.props.user.userId, this.props.buoyId);
  }

  // Function for the logic regarding clicking the <BuoyView /> container <div>
  buoyClickHandler(event) {
    const center = { lat: this.props.lat, lng: this.props.lng, };
    const zoom = 8;
    this.props.dispatchSelectBuoy(event, this.props.buoyId, center, zoom);
  }

  render() {
    const props = {
      ...this.props,
      favoriteClickHandler: this.favoriteClickHandler,
      buoyClickHandler: this.buoyClickHandler,
    };

    return <BuoyView {...props} />;
  }
}

Buoy.propTypes = {
  // Props
  isFavorite: PropTypes.bool,
  buoyId: PropTypes.string.isRequired,
  user: PropTypes.shape({
    userId: PropTypes.string,
  }),
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,

  // Functions and dispatchers
  dispatchAddToFavorites: PropTypes.func.isRequired,
  dispatchRemoveFavorite: PropTypes.func.isRequired,
  dispatchSelectBuoy: PropTypes.func.isRequired,
};

Buoy.defaultProps = {
  isFavorite: false,
  user: null,
};

const mapDispatchToProps = dispatch => ({
  dispatchAddToFavorites: (event, userId, buoyId) => {
    event.stopPropagation();
    dispatch(addFavorite(userId, buoyId));
  },
  dispatchRemoveFavorite: (event, userId, buoyId) => {
    event.stopPropagation();
    dispatch(removeFavorite(userId, buoyId));
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
