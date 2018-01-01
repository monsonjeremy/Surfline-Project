import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';

// Views
import MapsView from '../../components/Maps';
import { Marker, SearchBox } from '../';

// Action
import { selectBuoy } from '../../reducers/Data/actions';
import {
  updateMapZoom,
  mapLoaded,
  updateMapBounds,
  updateRadiusLatLng
} from '../../reducers/Maps/actions';

const googleMapsUrl =
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyDDtJVfn4LB_ExnDJgqisAUR_8rf_XMbg4&v=3.exp&libraries=geometry,drawing,places';

/**
 * @description Maps container connects the map view to the store and contains various functions 
 * for controlling the zoom and centering of the map. It also contains logic for rendering markers
 * based on which buoy is selected and what the filter is
 * @param {object} props - Component props
 *
 * @returns {<Maps />}
 */
class Maps extends Component {
  constructor(props) {
    super(props);

    this.renderMarkers = this.renderMarkers.bind(this);
    this.handleZoomChange = this.handleZoomChange.bind(this);
    this.handleBoundsChanged = this.handleBoundsChanged.bind(this);
    this.handleMapLoad = this.handleMapLoad.bind(this);
  }

  /**
   * @description - There are some weird side effects to tracking zoom with redux and using the onZoomChange prop for the Maps component
   * For example, we click a cluster marker the zoom changes and triggers another zoom change before the first zoom has completed
   * which ends up making us zoom back out after the initial zoom. I haven't found a fix yet but have been exploring debouncing, althought
   * I could not get that solution to work.
   */
  handleZoomChange() {
    this.props.dispatchUpdateMapZoom(this.map.getZoom());
  }

  /**
   * @description Handle the event where the bounds of the map change to control the bias for places API
   */
  handleBoundsChanged() {
    this.props.dispatchUpdateMapBounds(this.map.getBounds());
  }

  /**
   * @description When the map loads, we store a reference to it in this context so that we can use functions like map.getZoom()
  */
  handleMapLoad(map) {
    this.props.dispatchMapLoaded();
    this.map = map;
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
            handleMarkerClick={this.handleMarkerClick}
            position={{ lat: buoy.lat, lng: buoy.lng, }}
            buoyId={buoy.buoyId}
            readings={buoy.readings}
            isFavorite={isFavorite}
            dispatchSelectBuoy={this.props.dispatchSelectBuoy}
          />
        );
      });
    }
    return null;
  }

  render() {
    return (
      <MapsView
        googleMapURL={googleMapsUrl}
        loadingElement={<div style={{ height: `100%`, }} />}
        containerElement={<div className="maps-container" />}
        mapElement={<div style={{ height: `100%`, }} />}
        center={this.props.center}
        handleZoomChange={this.handleZoomChange}
        handleBoundsChanged={this.handleBoundsChanged}
        handleMapLoad={this.handleMapLoad}
        handleSearchBoxMounted={this.handleSearchBoxMount}
        handlePlacesChanged={this.handlePlacesChanged}
        zoom={this.props.zoom}
      >
        <SearchBox />
        <MarkerClusterer averageCenter defaultMaxZoom={6} enableRetinaIcons gridSize={40}>
          {this.renderMarkers()}
        </MarkerClusterer>
      </MapsView>
    );
  }
}

Maps.propTypes = {
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
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,

  zoom: PropTypes.number.isRequired,
  filterFavorites: PropTypes.bool.isRequired,
  selectedBuoy: PropTypes.string,

  // Funcs and dispatchers
  dispatchSelectBuoy: PropTypes.func.isRequired,
  dispatchUpdateMapZoom: PropTypes.func.isRequired,
  dispatchUpdateMapBounds: PropTypes.func.isRequired,
  dispatchMapLoaded: PropTypes.func.isRequired,
};

Maps.defaultProps = {
  user: null,
  selectedBuoy: null,
};

const mapDispatchToProps = dispatch => ({
  dispatchSelectBuoy: buoyId => {
    dispatch(selectBuoy(buoyId));
  },
  dispatchUpdateMapZoom: zoom => {
    dispatch(updateMapZoom(zoom));
  },
  dispatchUpdateMapBounds: bounds => {
    dispatch(updateMapBounds(bounds));
  },
  dispatchMapLoaded: () => {
    dispatch(mapLoaded());
  },
  dispatchUpdateRadiusLatLng: (radius, lat, lng) => {
    dispatch(updateRadiusLatLng(radius, lat, lng));
  },
});

const mapStateToProps = state => ({
  ...state.User,
  ...state.Data,
  ...state.Maps,
});

export default connect(mapStateToProps, mapDispatchToProps)(Maps);
