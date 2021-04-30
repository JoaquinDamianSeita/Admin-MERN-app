import { combineReducers } from 'redux';
import contacts from './contactsReducer';
import contact from './contactReducer';

export default combineReducers({
  contacts: contacts,
  contact: contact,
});