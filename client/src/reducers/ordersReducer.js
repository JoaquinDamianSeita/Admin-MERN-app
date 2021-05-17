import { SET_ORDERS, ADD_ORDER, REMOVE_ORDER } from "../actions";

const initialState = {orders:[]}
export default function ordersReducer(state = initialState,action){
    switch (action.type){
        case SET_ORDERS:
            return action.orders;
        case ADD_ORDER:
            return [action.order,...state];
        case REMOVE_ORDER:
            return state.filter(order => order._id !== action._id);
        default:
            return state;
    }
}