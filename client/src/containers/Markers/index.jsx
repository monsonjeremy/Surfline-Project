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

      return buoyData.map(buoy => {
        let visible = false;
        let isFavorite = false;
        // Not logged in so we don't have to worry about checking favorites (small optimization)
        if (!this.props.user) {
          visible = true;
        } else {
          isFavorite = !!this.props.user.favorites[buoy.buoyId];
          if (!this.props.filterFavorites || (this.props.filterFavorites && isFavorite)) {
            // If on favorites tab filter out non favorite buoys, if not then all buoy markers visible
            visible = true;
          }
        }

        // Render the buoy with the given visibility and selected status
        return (
          <Marker
            key={buoy.buoyId}
            visible={visible}
            selected={buoy.buoyId === this.props.selectedBuoy}
            position={{ lat: buoy.lat, lng: buoy.lng, }}
            buoyId={buoy.buoyId}
            readings={buoy.readings}
            isFavorite={isFavorite}
          />
        );
      });
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
  user: PropTypes.shape({
    favorites: PropTypes.instanceOf(Object),
  }),
  filterFavorites: PropTypes.bool.isRequired,
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
