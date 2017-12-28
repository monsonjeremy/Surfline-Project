import { combineReducers } from 'redux';

import Modal from './Modal';
import Authentication from './Authentication';
import Data from './Data';

const SurflineReducer = combineReducers({
  Modal,
  Authentication,
  Data,
});

export default SurflineReducer;
