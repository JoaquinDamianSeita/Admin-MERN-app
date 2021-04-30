import { get } from "axios";

export const SET_CONTACTS = "SET_CONTACTS";
export const ADD_CONTACT = "ADD_CONTACT";

export function setContacts(){
    return function (dispatch){
        return get("/api/contacts")
        .then(function (response){
            dispatch({type:SET_CONTACTS,contacts:response.data})
        })
        .catch(function (error){console.log("error",error);})
    };
};

export function addContact(contact){
    return {
        type:ADD_CONTACT,
        contact:contact,
    };
};