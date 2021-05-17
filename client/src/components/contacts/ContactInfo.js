import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

import { setContact, removeContact } from "../../actions";

function ContactInfo(props) {
  const contact = useSelector((state) => state.contact);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`/api/contacts/${props.match.params._id}`)
      .then((response) => {
        dispatch(setContact(response.data));
      })
      .catch((error) => {
        console.log(("error", error));
      });
  }, [dispatch, props]);

  function handleDelete() {
    axios
      .delete(`/api/contacts/${contact._id}`)
      .then(() => {
        dispatch(removeContact(contact._id));
        props.history.push("/");
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
  return (
    <div>
      <h2>{contact.name}</h2>
      <small>id: {contact._id}</small>
      <p>{contact.tel}</p>
      <p>{contact.adress}</p>
      <p>{contact.email}</p>
      
      <div className="btn-group">
        <Link
          to={{ pathname: `/contacts/${contact._id}/edit` }}
          className="btn btn-info"
        >
          Edit
        </Link>
        <button className="btn btn-danger" type="button" onClick={handleDelete}>
          Delete
        </button>
        <Link to="/" className="btn btn-secondary">
          Close
        </Link>
      </div>
      <hr />
    </div>
  );
}

export default ContactInfo;
