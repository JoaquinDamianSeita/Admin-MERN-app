import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { patch } from "axios";
import { setContact, replaceContact } from "../../actions";

function ContactEdit(props) {
  const initialState = useSelector((state) => state.contact);
  let [contact, changeContact] = useState(initialState);
  const dispatch = useDispatch();

  function handleChange(event) {
    changeContact({
      ...contact,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!contact.name || !contact.tel || !contact.email || !contact.adress)
      return;
    patch(`/api/contacts/${contact._id}`, {
      name: contact.name,
      tel: contact.tel,
      email: contact.email,
      adress: contact.adress,
    })
      .then(() => {
        dispatch(setContact(contact));
        dispatch(replaceContact(contact));
      })
      .then(() => {
        props.history.push(`/contacts/${contact._id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCancel() {
    props.history.push(`/contacts/${contact._id}`);
  }

  return (
    <div>
      <h1>Edit {contact.name}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            defaultValue={contact.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="tel"
            defaultValue={contact.tel}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="email"
            defaultValue={contact.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="adress"
            defaultValue={contact.adress}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="btn-group">
            <button type="submit" className="btn btn-primary">Update</button>
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default ContactEdit;
