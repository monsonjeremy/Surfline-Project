import React from 'react';

import '../../styles/Loader/Loader.css';

/**
 * @description Loader component represents the view for the Loader 
 * 
 * @returns {<Loader />}
 */
const Loader = () => (
  <div className={`loader-container`}>
    <span className="loader">
      <span className="loader-inner" />
    </span>
  </div>
);

Loader.propTypes = {};

Loader.defaultProps = {};

export default Loader;
