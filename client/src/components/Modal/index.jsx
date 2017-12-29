import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/Modal/Modal.css';

const ModalWrapper = props => (
  <div role="button" className="sp-modal-bg" onClick={props.handleBackgroundClick}>
    <div className="sp-modal-content">
      <header>
        <h1>{props.title}</h1>
      </header>
      {props.children}
      <button onClick={props.dispatchHideModal}>Close</button>
    </div>
  </div>
);

ModalWrapper.propTypes = {
  // props
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element, PropTypes.string]).isRequired,
  title: PropTypes.string.isRequired,

  // dispatchers & functions
  dispatchHideModal: PropTypes.func.isRequired,
  handleBackgroundClick: PropTypes.func.isRequired,
};

ModalWrapper.defaultProps = {};

export default ModalWrapper;
