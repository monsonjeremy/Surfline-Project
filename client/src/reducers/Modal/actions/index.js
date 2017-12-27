import { makeActionCreator } from '../../../lib';

export const SHOW_MODAL = 'SHOW_MODAL';
export const showModal = makeActionCreator(SHOW_MODAL, 'modalType');

export const HIDE_MODAL = 'HIDE_MODAL';
export const hideModal = makeActionCreator(HIDE_MODAL);

// Function for dispatching an action to show a specific modal (puttting it here is more DRY)
export function dispatchShowModal(modalType) {
  return dispatch => {
    dispatch(showModal(modalType));
  };
}
