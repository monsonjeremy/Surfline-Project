import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Views
import DashboardView from '../../components/Dashboard';

// Actions
import { showAllBuoys, showFavBuoys } from '../../reducers/Data/actions';

/**
 * @description Dashboard contains the logic for dispatching actions regarding what list of buoys is displayed
 * (favorites or all) and passing users login state from the store for enabling/disabling the buttons.
 *
 * @param {object} props - Component props
 *
 * @returns {<Dashboard />}
 */
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <DashboardView {...this.props}>{this.props.children}</DashboardView>;
  }
}

Dashboard.propTypes = {
  children: PropTypes.node,
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
});

const mapStateToProps = state => ({
  ...state.Data,
  ...state.User,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
