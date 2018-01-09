import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Polyfill for using FormData on safari IE and other unsupported browsers
import 'formdata-polyfill';

// Views
import DashboardView from '../../components/Dashboard';

// Actions
import { showAllBuoys, showFavBuoys } from '../../reducers/Data/actions';
import { updateRadiusLatLng } from '../../reducers/Maps/actions';

/**
 * @description Dashboard container contains the dispatcher for filter between all and favorite 
 *              buoys and passes them to the view
 *
 * @param {object} props - Component props
 * @param {boolean} props.dataError - Error message for data actions
 * @param {boolean} props.userError - Error message for user actions
 * @param {boolean} props.mapsError - Error message for maps actions
 * @param {node} props.children - Children
 *
 * @returns {<Dashboard />}
 */
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formSubmitEnabled: false,
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormEnable = this.handleFormEnable.bind(this);
    this.handleShowAllBuoys = this.handleShowAllBuoys.bind(this);
    this.handleShowFavBuoys = this.handleShowFavBuoys.bind(this);
  }

  handleFormSubmit(event) {
    // We want to stop event propagation just in case event bubbling/capturing phase causes issues
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      formSubmitEnabled: false,
    });
    const data = new FormData(event.target);
    let radius = parseFloat(data.get('radius'));
    let lat = parseFloat(data.get('latitude'));
    let lng = parseFloat(data.get('longitude'));

    // Handle empty fields since they are optional (set to current values)
    if (!radius) radius = this.props.radius;
    if (!lat) lat = this.props.center.lat;
    if (!lng) lng = this.props.center.lng;

    // Dispatch
    this.props.dispatchUpdateRadiusLatLng(radius, lat, lng, this.props.filterFavorites);
  }

  /**
   * @description Disable submitting the form until values have been entered into any of the fields
   */
  handleFormEnable() {
    if (!this.state.formSubmitEnabled) {
      this.setState({
        formSubmitEnabled: true,
      });
    }
  }

  /**
   * @description When the user hits show all buoys, keep the current center but reset the radius to default (100)
   */
  async handleShowAllBuoys() {
    await this.props.dispatchShowAllBuoys();
    const { lat, lng, } = this.props.center;
    const { radius, filterFavorites, } = this.props;
    this.props.dispatchUpdateRadiusLatLng(radius, lat, lng, filterFavorites);
  }

  /**
   * @description When the user hits show fav buoys, keep the current center but max out the radius so we can get ALL their favorites
   */
  async handleShowFavBuoys() {
    await this.props.dispatchShowFavBuoys();
    const { lat, lng, } = this.props.center;
    const { radius, filterFavorites, } = this.props;
    this.props.dispatchUpdateRadiusLatLng(radius, lat, lng, filterFavorites);
  }

  render() {
    const props = {
      ...this.props,
      handleFormSubmit: this.handleFormSubmit,
      handleFormEnable: this.handleFormEnable,
      handleShowFavBuoys: this.handleShowFavBuoys,
      handleShowAllBuoys: this.handleShowAllBuoys,
      formSubmitEnabled: this.state.formSubmitEnabled,
    };
    return <DashboardView {...props}>{this.props.children}</DashboardView>;
  }
}

Dashboard.propTypes = {
  // Props
  children: PropTypes.node,
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  radius: PropTypes.number.isRequired,
  filterFavorites: PropTypes.bool,

  // Functions and dispatchers
  dispatchUpdateRadiusLatLng: PropTypes.func.isRequired,
  dispatchShowAllBuoys: PropTypes.func.isRequired,
  dispatchShowFavBuoys: PropTypes.func.isRequired,
};

Dashboard.defaultProps = {
  children: null,
  filterFavorites: false,
};

const mapDispatchToProps = dispatch => ({
  dispatchShowAllBuoys: async () => {
    dispatch(showAllBuoys());
  },
  dispatchShowFavBuoys: async () => {
    dispatch(showFavBuoys());
  },
  dispatchUpdateRadiusLatLng: (radius, lat, lng, favoritesOnly) => {
    dispatch(updateRadiusLatLng(radius, lat, lng, favoritesOnly));
  },
});

const mapStateToProps = state => ({
  ...state.Data,
  ...state.User,
  ...state.Maps,
  userError: state.User.baseError,
  dataError: state.Data.buoy.baseError,
  mapsError: state.Maps.baseError,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
