import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Views
import BuoyListView from '../../components/BuoyList';

// Containers
import { Buoy } from '../';

// Actions
import { hydrateBuoyData } from '../../reducers/Data/actions';

/**
 * @description BuoyList contains the logic for querying the RSS feed and hydrating the buoy list data
 * and then passing that data to the view
 *
 * @param {object} props - Component props
 * @param {function} props.dispatchFetchBuoyData - Function used to fetch the buoy data upon mounting the component
 * @param {object} props.buoy - The buoy data object from the store
 * @param {object} props.user - The user object from the store
 * @param {Array<string>} props.user.favorites - The user object from the store
 * @param {boolean} props.filterFavorites - Whether or not to filter by favorites
 * @param {boolean} props.buoy.isLoading - Flag for determining if the buoy data is loading
 * @param {object} props.buoy.data - The buoy data object
 *
 * @returns {<BuoyList />}
 */
class BuoyList extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.renderBuoys = this.renderBuoys.bind(this);
  }

  componentDidMount() {
    const { lat, lng, } = this.props.center;
    const radius = this.props.radius;
    const favoritesOnly = this.props.filterFavorites;
    this.props.dispatchFetchBuoyData(lat, lng, radius, favoritesOnly);
  }

  renderBuoys() {
    // If we aren't loading and there is data -> render buoys
    if (!this.props.buoy.isLoading && this.props.buoy.data) {
      const buoyData = this.props.buoy.data.buoys;

      return buoyData.map(buoy => <Buoy key={buoy.buoyId} {...buoy} />);
    }
    return null;
  }

  render() {
    const buoyChildren = this.renderBuoys();

    // If there are buyos to be rendered then the user has favorites so we can set a flag to not display "You have no favroites"
    let hasFavorites = false;

    if (buoyChildren) hasFavorites = buoyChildren.filter(buoy => buoy !== null).length > 0;

    const props = {
      ...this.props,
      hasFavorites,
    };

    return <BuoyListView {...props}>{this.renderBuoys()}</BuoyListView>;
  }
}

BuoyList.propTypes = {
  dispatchFetchBuoyData: PropTypes.func.isRequired,
  buoy: PropTypes.shape({
    data: PropTypes.shape({
      lastUpdated: PropTypes.string,
      buoys: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          lastUpdated: PropTypes.string,
          buoyId: PropTypes.string,
          readings: PropTypes.string,
          link: PropTypes.string,
          geoPoint: PropTypes.string,
        })
      ),
    }),
    isLoading: PropTypes.bool,
  }).isRequired,
  user: PropTypes.shape({
    favorites: PropTypes.instanceOf(Object),
  }),
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  filterFavorites: PropTypes.bool.isRequired,
  radius: PropTypes.number.isRequired,
};

BuoyList.defaultProps = {
  user: null,
};

const mapDispatchToProps = dispatch => ({
  dispatchFetchBuoyData: (lat, lng, radius, favoritesOnly) => {
    dispatch(hydrateBuoyData(lat, lng, radius, favoritesOnly));
  },
});

const mapStateToProps = state => ({
  ...state.Data,
  ...state.User,
  ...state.Maps,
});

export default connect(mapStateToProps, mapDispatchToProps)(BuoyList);
