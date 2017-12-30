import { makeActionCreator } from '../../../lib';

// Actions
import { clearErrors } from '../../User/actions';

export const SHOW_MODAL = 'SHOW_MODAL';
export const showModal = makeActionCreator(SHOW_MODAL, 'modalType');

export const HIDE_MODAL = 'HIDE_MODAL';
export const hideModal = makeActionCreator(HIDE_MODAL);

/**
 * @description - Function for dispatching an action to show a given modal
 * @param {string} modalType 
 * 
 * @returns {function} dispatcher
 */
export function dispatchShowModal(modalType) {
  return dispatch => {
    dispatch(clearErrors());
    dispatch(showModal(modalType));
  };
}
