import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Views
import MarkerView from '../../components/Marker';

/**
 * @description Marker container connects the markers to the store and passes down relevant state
 * @param {object} props - Component props
 *
 * @returns {<Marker />}
 */
class Marker extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
  }

  handleCloseClick() {
    this.props.dispatchSelectBuoy(null);
  }

  handleMarkerClick() {
    this.props.handleMarkerClick(this.props.position, this.props.buoyId);
  }

  render() {
    // If it's not visible, shortcut and don't render it
    if (!this.props.visible) {
      return null;
    }

    // The path for the custom marker icon on the map
    const markerPath = `M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z`;

    // Define the icon styles
    let fillColor = '#3477db';
    if (this.props.isFavorite) fillColor = '#34db58';
    if (this.props.selected) fillColor = '#d24d57';

    const icon = {
      fillColor,
      path: markerPath,
      anchor: new google.maps.Point(250, 504),
      fillOpacity: 1,
      strokeWeight: 0.5,
      strokeColor: 'black',
      scale: this.props.selected ? 0.05 : 0.03,
    };

    const props = {
      ...this.props,
      icon,
      handleCloseClick: this.handleCloseClick,
      handleMarkerClick: this.handleMarkerClick,
    };

    return <MarkerView {...props} />;
  }
}

Marker.propTypes = {
  // Props
  selected: PropTypes.bool,
  position: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  visible: PropTypes.bool.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  readings: PropTypes.string.isRequired,
  buoyId: PropTypes.string.isRequired,

  // Functions and dispatchers
  dispatchSelectBuoy: PropTypes.func.isRequired,
  handleMarkerClick: PropTypes.func.isRequired,
};

Marker.defaultProps = {
  selected: false,
};

const mapStateToProps = state => ({
  ...state.User,
});

export default connect(mapStateToProps)(Marker);
