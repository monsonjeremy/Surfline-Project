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
    this.props.dispatchUpdateRadiusLatLng(radius, lat, lng);
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
  handleShowAllBuoys() {
    const radius = 100;
    this.props.dispatchShowAllBuoys(this.props.center.lat, this.props.center.lng, radius);
  }

  /**
   * @description When the user hits show fav buoys, keep the current center but max out the radius so we can get ALL their favorites
   */
  handleShowFavBuoys() {
    const radius = 999999;
    this.props.dispatchShowFavBuoys(this.props.center.lat, this.props.center.lng, radius);
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

  // Functions and dispatchers
  dispatchUpdateRadiusLatLng: PropTypes.func.isRequired,
  dispatchShowAllBuoys: PropTypes.func.isRequired,
  dispatchShowFavBuoys: PropTypes.func.isRequired,
};

Dashboard.defaultProps = {
  children: null,
};

const mapDispatchToProps = dispatch => ({
  dispatchShowAllBuoys: (lat, lng, radius) => {
    dispatch(updateRadiusLatLng(radius, lat, lng));
    dispatch(showAllBuoys());
  },
  dispatchShowFavBuoys: (lat, lng, radius) => {
    dispatch(updateRadiusLatLng(radius, lat, lng));
    dispatch(showFavBuoys());
  },
  dispatchUpdateRadiusLatLng: (radius, lat, lng) => {
    dispatch(updateRadiusLatLng(radius, lat, lng));
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
