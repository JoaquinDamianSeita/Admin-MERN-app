import { SET_CONTACTS, ADD_CONTACT, REMOVE_CONTACT, REPLACE_CONTACT } from "../actions";

const inicialState = { contacts: [] };
export default function contactsReducer(state = inicialState, action) {
  switch (action.type) {
    case SET_CONTACTS:
      return action.contacts;
    case ADD_CONTACT:
      return [action.contact, ...state];
    case REMOVE_CONTACT:
      return state.filter(contact => contact._id !== action._id);
    case REPLACE_CONTACT:
      return state.map((contact)=>{
        if (contact._id === action.contact._id){
          return {
            ...contact,
            name:action.contact.name,
            tel:action.contact.tel,
            email:action.contact.email,
            adress:action.contact.adress
          }
        } else return contact;
      })
    default:
      return state;
  }
}
