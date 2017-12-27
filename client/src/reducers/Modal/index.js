import { SHOW_MODAL, HIDE_MODAL } from './actions';

const Modal = (
  state = {
    currentModal: null,
  },
  action
) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        currentModal: action.modalType,
      };
    case HIDE_MODAL:
      return {
        ...state,
        currentModal: null,
      };
    default:
      return state;
  }
};

export default Modal;
