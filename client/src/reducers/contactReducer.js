import { SET_CONTACT } from "../actions";

export default function contactReducer(state = {},action){
    switch (action.type){
        case SET_CONTACT:
            return action.contact;
        default:
            return state;
    }
}