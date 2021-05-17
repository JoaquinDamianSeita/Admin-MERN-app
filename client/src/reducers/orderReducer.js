import  { SET_ORDER } from "../actions";

export default function orderReducer (state = {},action){
    switch (action.type){
        case SET_ORDER:
            return action.order;
        default:
            return state;
    }
}