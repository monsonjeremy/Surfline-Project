import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { get } from 'lodash';

// Views
import SearchBoxView from '../../components/SearchBox';

// Actions
import { updateMapCenterAndZoom, updateRadiusLatLng } from '../../reducers/Maps/actions';

/**
 * @description SearchBox container connects the markers to the store and passes down relevant state
 * @param {object} props - Component props
 *
 * @returns {<SearchBox />}
 */
class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleSearchBoxMounted = this.handleSearchBoxMounted.bind(this);
    this.handlePlacesChanged = this.handlePlacesChanged.bind(this);
  }

  /**
   * @description When the Search Bar loads, we store a reference to it in this context
  */
  handleSearchBoxMounted(searchBox) {
    this.searchBox = searchBox;
  }

  /**
   * @description Handle users entering a location in the places API
   */
  handlePlacesChanged() {
    const places = this.searchBox.getPlaces();
    const bounds = new google.maps.LatLngBounds();

    places.forEach(place => {
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    const nextMarkers = places.map(place => ({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    }));

    const nextCenter = get(nextMarkers, '0', this.props.center);

    this.props.dispatchUpdateMapCenterAndZoom(nextCenter, 8);
    this.props.dispatchUpdateRadiusLatLng(this.props.radius, nextCenter.lat, nextCenter.lng);
  }

  render() {
    const props = {
      ...this.props,
      handlePlacesChanged: this.handlePlacesChanged,
      handleSearchBoxMounted: this.handleSearchBoxMounted,
    };

    return <SearchBoxView {...props} />;
  }
}

SearchBox.propTypes = {
  // Props
  radius: PropTypes.number.isRequired,
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,

  // Functions and dispatchers
  dispatchUpdateMapCenterAndZoom: PropTypes.func.isRequired,
  dispatchUpdateRadiusLatLng: PropTypes.func.isRequired,
};

SearchBox.defaultProps = {
  selected: false,
};

const mapStateToProps = state => ({
  ...state.User,
  ...state.Data,
  ...state.Maps,
});

const mapDispatchToProps = dispatch => ({
  dispatchUpdateMapCenterAndZoom: (center, zoom) => {
    dispatch(updateMapCenterAndZoom(center, zoom));
  },
  dispatchUpdateRadiusLatLng: (radius, lat, lng) => {
    dispatch(updateRadiusLatLng(radius, lat, lng));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
