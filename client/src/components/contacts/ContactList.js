import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ContactList() {
  const contacts = useSelector(function (state) {
    return state.contacts;
  });
  return (
    <div>
      <h2>
        Contacts
        <Link to="/contacts/new" className="btn btn-primary float-right">
          Create Contact
        </Link>
      </h2>
      <hr/>
      {contacts.length &&
        contacts.map(function (contact) {
          return (
            <div key={contact._id}>
              <hr />
              <h4>
                <Link to={`/contacts/${contact._id}`}>{contact.name}</Link>
              </h4>
              <small>_id: {contact._id}</small>
            </div>
          );
        })}
    </div>
  );
}

export default ContactList;