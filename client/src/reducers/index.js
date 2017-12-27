import { combineReducers } from 'redux';

import Modal from './Modal';
import Authentication from './Authentication';

const SurflineReducer = combineReducers({
  Modal,
  Authentication,
});

export default SurflineReducer;
