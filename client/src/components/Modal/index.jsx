import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/Modal/Modal.css';

/**
 * @description ModalWrapper component represents the base view for the Modals
 * 
 * @param {object} props - Props
 * @param {string} props.title - Title of the modal
 * @param {string} props.modalError - An error message to be shown on the modal
 * @param {node} props.children - Children to render
 * @param {function} props.handleBackgroundClick - Function to dispatch actions related to a click on the background of the modal
 * @param {function} props.dispatchHideModal - Function to dispatch actions to hide the modal
 * 
 * @returns {<ModalWrapper />}
 */
const ModalWrapper = props => (
  <div role="button" className="sp-modal-bg" onClick={props.handleBackgroundClick}>
    <div className="sp-modal-content">
      <header className="sp-modal-header text-center">
        <h1 className="sp-modal-title">{props.title}</h1>
        {props.modalError && (
          <div className="sp-modal-error">
            <h3>{props.modalError}</h3>
          </div>
        )}
      </header>
      {props.children}
      <button className="sp-btn sp-modal-close-btn" onClick={props.dispatchHideModal}>
        Close
      </button>
    </div>
  </div>
);

ModalWrapper.propTypes = {
  // props
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element, PropTypes.string]).isRequired,
  title: PropTypes.string.isRequired,
  modalError: PropTypes.string,

  // dispatchers & functions
  dispatchHideModal: PropTypes.func.isRequired,
  handleBackgroundClick: PropTypes.func.isRequired,
};

ModalWrapper.defaultProps = {
  modalError: null,
};

export default ModalWrapper;
