import { SET_ORDERS } from "../actions";

const initialState = {orders:[]}
export default function ordersReducer(state = initialState,action){
    switch (action.type){
        case SET_ORDERS:
            return action.orders;
        default:
            return state;
    }
}