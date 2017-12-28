import React from 'react';
import PropTypes from 'prop-types';

import '../../particles/Modal/Modal.css';

const BuoyList = props => (
  <div className={props.styles}>
    <h1>Here will lie a list of buoys</h1>
  </div>
);

BuoyList.propTypes = {
  styles: PropTypes.string,
};

BuoyList.defaultProps = {
  styles: '',
};

export default BuoyList;
