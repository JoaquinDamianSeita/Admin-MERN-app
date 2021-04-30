import { SET_CONTACTS, ADD_CONTACT } from "../actions";

const inicialState = { contacts: [] };
export default function contactsReducer(state = inicialState, action) {
  switch (action.type) {
    case SET_CONTACTS:
      return action.contacts;
    case ADD_CONTACT:
      return [action.contact, ...state];
    default:
      return state;
  }
}
