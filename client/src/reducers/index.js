import { combineReducers } from 'redux';

import Modal from './Modal';
import User from './User';
import Data from './Data';

const SurflineReducer = combineReducers({
  Modal,
  User,
  Data,
});

export default SurflineReducer;
