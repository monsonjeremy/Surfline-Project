import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';

// Views
import Marker from './Marker';

/**
 * @description Markers container connects all the markers to the store and contains the logic for rendering
 * all the markers that need to be rendered on the map
 * @param {object} props - Component props
 *
 * @returns {<Markers />}
 */
class Markers extends Component {
  constructor(props) {
    super(props);

    this.renderMarkers = this.renderMarkers.bind(this);
  }

  /**
   * @description Function used to encapsulate the logic for rendering a marker on the map or not
  */
  renderMarkers() {
    // If we aren't loading and there is data -> render buoys
    if (!this.props.buoy.isLoading && this.props.buoy.data) {
      const buoyData = this.props.buoy.data.buoys;

      return buoyData.map(buoy => (
        // Render the buoy with the given visibility and selected status
        <Marker
          key={buoy.buoyId}
          visible
          selected={buoy.buoyId === this.props.selectedBuoy}
          position={{ lat: buoy.lat, lng: buoy.lng, }}
          buoyId={buoy.buoyId}
          readings={buoy.readings}
          isFavorite={buoy.isFavorite}
        />
      ));
    }
    return null;
  }

  render() {
    const markers = this.renderMarkers();

    return (
      <MarkerClusterer averageCenter defaultMaxZoom={6} enableRetinaIcons gridSize={40}>
        {markers}
      </MarkerClusterer>
    );
  }
}

Markers.propTypes = {
  // Props
  buoy: PropTypes.shape({
    data: PropTypes.shape({
      buoys: PropTypes.arrayOf(
        PropTypes.shape({
          buoyId: PropTypes.string,
          lat: PropTypes.number,
          lng: PropTypes.number,
        })
      ),
    }),
    isLoading: PropTypes.bool,
  }).isRequired,
  selectedBuoy: PropTypes.string,
};

Markers.defaultProps = {
  user: null,
  selectedBuoy: null,
};

const mapStateToProps = state => ({
  ...state.User,
  ...state.Data,
  ...state.Maps,
});

export default connect(mapStateToProps)(Markers);
