import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { post } from "axios";
import { addContact } from "../../actions";

function ContactAdd(props) {
  const initialState = { name: "", tel: "", email: "", adress: "" };
  const [contact, setFields] = useState(initialState);
  const dispatch = useDispatch();

  function handleChange(event) {
    setFields({ ...contact, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!contact.name || !contact.tel) return;
    post("/api/contacts", {
      name: contact.name,
      tel: contact.tel,
      email: contact.email,
      adress: contact.adress,
    })
      .then(function (response) {
        dispatch(addContact(response.data));
      })
      .then(function () {
        props.history.push("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleCancel() {
    props.history.push("/");
  }

  return (
    <div>
      <h4>Add Contact</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            required
            value={contact.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Name"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="tel"
            required
            value={contact.tel}
            onChange={handleChange}
            className="form-control"
            placeholder="Tel"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="email"
            required
            value={contact.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="adress"
            required
            value={contact.adress}
            onChange={handleChange}
            className="form-control"
            placeholder="Adress"
          />
        </div>
        <div className="btn-group">
          <input type="submit" value="Submit" className="btn btn-primary" />
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactAdd;
