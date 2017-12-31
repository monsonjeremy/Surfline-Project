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
    this.props.dispatchFetchBuoyData();
  }

  renderBuoys() {
    // If we aren't loading and there is data -> render buoys
    if (!this.props.buoy.isLoading && this.props.buoy.data) {
      const buoyData = this.props.buoy.data.buoys;

      return buoyData.map(buoy => {
        // Define the props to be passed to <Buoy />
        const props = {
          ...buoy,
        };

        // Not logged in so we don't have to worry about checking favorites (small optimization)
        if (!this.props.user) return <Buoy key={buoy.buoyId} {...props} />;

        // If we are on the favorites tab filter out non favorite buoys
        const showFavorites = this.props.filterFavorites;
        const isFavorite = this.props.user.favorites.indexOf(buoy.buoyId) !== -1;

        if (!showFavorites || (showFavorites && isFavorite)) {
          props.isFavorite = isFavorite;
          return <Buoy key={buoy.buoyId} {...props} />;
        }

        return null;
      });
    }
    return null;
  }

  render() {
    return <BuoyListView {...this.props}>{this.renderBuoys()}</BuoyListView>;
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
    favorites: PropTypes.arrayOf(PropTypes.string),
  }),
  filterFavorites: PropTypes.bool.isRequired,
};

BuoyList.defaultProps = {
  user: null,
};

const mapDispatchToProps = dispatch => ({
  dispatchFetchBuoyData: () => {
    dispatch(hydrateBuoyData());
  },
});

const mapStateToProps = state => ({
  ...state.Data,
  ...state.User,
});

export default connect(mapStateToProps, mapDispatchToProps)(BuoyList);
