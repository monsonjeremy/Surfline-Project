import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Views
import MapsView from '../../components/Maps';

// Action
import { updateMapZoom, mapLoaded, updateMapBounds } from '../../reducers/Maps/actions';
import { selectBuoy } from '../../reducers/Data/actions/index';

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

    this.handleZoomChange = this.handleZoomChange.bind(this);
    this.handleBoundsChanged = this.handleBoundsChanged.bind(this);
    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
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
   * @description This function is used to handle the case where a user clicks on the map. In this case we want to close the selected buoy tooltip
   */
  handleMapClick() {
    this.props.dispatchSelectBuoy(null);
  }

  render() {
    return (
      <MapsView
        googleMapURL={googleMapsUrl}
        loadingElement={<div style={{ height: `100%`, }} />}
        containerElement={<div className="maps-container" />}
        mapElement={<div style={{ height: `100%`, }} />}
        center={this.props.center}
        handleMapClick={this.handleMapClick}
        handleZoomChange={this.handleZoomChange}
        handleBoundsChanged={this.handleBoundsChanged}
        handleMapLoad={this.handleMapLoad}
        handleSearchBoxMounted={this.handleSearchBoxMount}
        handlePlacesChanged={this.handlePlacesChanged}
        zoom={this.props.zoom}
      >
        {this.props.children}
      </MapsView>
    );
  }
}

Maps.propTypes = {
  // Props
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  zoom: PropTypes.number.isRequired,
  children: PropTypes.node,

  // Funcs and dispatchers
  dispatchUpdateMapZoom: PropTypes.func.isRequired,
  dispatchUpdateMapBounds: PropTypes.func.isRequired,
  dispatchMapLoaded: PropTypes.func.isRequired,
  dispatchSelectBuoy: PropTypes.func.isRequired,
};

Maps.defaultProps = {
  user: null,
  selectedBuoy: null,
  children: null,
};

const mapDispatchToProps = dispatch => ({
  dispatchUpdateMapZoom: zoom => {
    dispatch(updateMapZoom(zoom));
  },
  dispatchUpdateMapBounds: bounds => {
    dispatch(updateMapBounds(bounds));
  },
  dispatchMapLoaded: () => {
    dispatch(mapLoaded());
  },
  dispatchSelectBuoy: buoyId => {
    dispatch(selectBuoy(buoyId));
  },
});

const mapStateToProps = state => ({
  ...state.User,
  ...state.Data,
  ...state.Maps,
});

export default connect(mapStateToProps, mapDispatchToProps)(Maps);
