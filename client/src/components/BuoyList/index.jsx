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
  <div className={'buoy-list-container sp-container'}>
    {props.hasFavorites ? props.children : <h3>You currently have no favorites.</h3>}
  </div>
);

BuoyList.propTypes = {
  children: PropTypes.node,
  hasFavorites: PropTypes.bool,
};

BuoyList.defaultProps = {
  children: null,
  hasFavorites: false,
};

export default BuoyList;
