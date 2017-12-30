import { combineReducers } from 'redux';

import Modal from './Modal';
import User from './User';
import Data from './Data';
import Maps from './Maps';

const SurflineReducer = combineReducers({
  Modal,
  User,
  Data,
  Maps,
});

export default SurflineReducer;
