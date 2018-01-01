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
  }

  handleFormSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      formSubmitEnabled: false,
    });
    const data = new FormData(event.target);
    const radius = parseFloat(data.get('radius'));
    const lat = parseFloat(data.get('latitude'));
    const lng = parseFloat(data.get('longitude'));
    this.props.dispatchUpdateRadiusLatLng(radius, lat, lng);
  }

  handleFormEnable() {
    if (!this.state.formSubmitEnabled) {
      this.setState({
        formSubmitEnabled: true,
      });
    }
  }

  render() {
    const props = {
      ...this.props,
      handleFormSubmit: this.handleFormSubmit,
      handleFormEnable: this.handleFormEnable,
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
};

Dashboard.defaultProps = {
  children: null,
};

const mapDispatchToProps = dispatch => ({
  dispatchShowAllBuoys: () => {
    dispatch(showAllBuoys());
  },
  dispatchShowFavBuoys: () => {
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
