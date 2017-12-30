import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/BuoyList/BuoyList.css';

/**
 * @description BuoyList component represents the view for the buoy list container which has
 * any number of children <Buoy /> components.
 *
 * @param {object} props - Props
 * @param {any} props.children - The children to render as a child of this component
 * 
 * @returns {<BuoyList />}
 *
 */
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
