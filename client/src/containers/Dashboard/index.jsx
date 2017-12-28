import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Views
import DashboardView from '../../components/Dashboard';

// Actions
import { showAllBuoys, showFavBuoys } from '../../reducers/Data/actions';
import { dispatchShowModal } from '../../reducers/Modal/actions';

/**
 * @description Dashboard contains the logic for dispatching actions regarding what list of buoys is displayed
 * (favorites or all) and enabling/disabling the buttons based on the users login state.
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

  componentDidMount() {}

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
  dispatchShowModal: modalType => {
    dispatch(dispatchShowModal(modalType));
  },
});

const mapStateToProps = state => ({
  ...state.Data,
  ...state.Authentication,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
