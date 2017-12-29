import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/BuoyList/BuoyList.css';

const BuoyList = props => (
  <div className={'buoy-list-container sp-container'}>{props.children}</div>
);

BuoyList.propTypes = {
  children: PropTypes.node,
};

BuoyList.defaultProps = {
  children: null,
};

export default BuoyList;
