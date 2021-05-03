import { combineReducers } from 'redux';
import contacts from './contactsReducer';
import contact from './contactReducer';
import orders from "./ordersReducer";
import order from "./orderReducer";

export default combineReducers({
  contacts: contacts,
  contact: contact,
  orders: orders,
  order: order
});