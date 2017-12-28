import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import BuoyListView from '../../components/BuoyList';

/**
 * @description BuoyList contains the logic for querying the RSS feed and hydrating the buoy list data
 * and then passing that data to the view
 *
 * @param {object} props - Component props
 *
 * @returns {<BuoyList />}
 */
class BuoyList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <BuoyListView />;
  }
}

BuoyList.propTypes = {};

export default BuoyList;
