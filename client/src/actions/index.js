import { get } from "axios";

export const SET_CONTACTS = "SET_CONTACTS";
export const ADD_CONTACT = "ADD_CONTACT";
export const SET_CONTACT = "SET_CONTACT";
export const REMOVE_CONTACT = "REMOVE_CONTACT";
export const REPLACE_CONTACT = "REPLACE_CONTACT";

export const SET_ORDERS = "SET_ORDERS";
export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDER = "SET_ORDER";
export const REMOVE_ORDER = "REMOVE_ORDER";

export function setContacts() {
  return function (dispatch) {
    return get("/api/contacts")
      .then(function (response) {
        dispatch({ type: SET_CONTACTS, contacts: response.data });
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };
}

export function setOrders() {
  return function (dispatch) {
    return get("/api/orders")
      .then(function (response) {
        dispatch({ type: SET_ORDERS, orders: response.data });
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };
}

export function addContact(contact) {
  return {
    type: ADD_CONTACT,
    contact: contact,
  };
}

export function addOrder(order) {
  return {
    type: ADD_ORDER,
    order: order,
  };
}

export function setContact(contact) {
  return {
    type: SET_CONTACT,
    contact: contact,
  };
}

export function setOrder(order) {
  return {
    type: SET_ORDER,
    order: order,
  };
}

export function removeContact(_id) {
  return {
    type: REMOVE_CONTACT,
    _id: _id,
  };
}

export function removeOrder(_id) {
  return {
    type: REMOVE_ORDER,
    _id: _id,
  };
}

export function replaceContact(contact) {
  return {
    type: REPLACE_CONTACT,
    contact: contact,
  };
}
