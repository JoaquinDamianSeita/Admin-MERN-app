import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { post } from "axios";
import { addContact } from "../../actions";
import { Modal } from "react-bootstrap";

function ContactAdd(props) {
  const initialState = { name: "", tel: "", email: "", adress: "" };
  const [contact, setFields] = useState(initialState);
  const [open,setOpen] = useState(props.isOpen);
  const dispatch = useDispatch();

  console.log(props.contactId);

  useEffect(()=>{
    setOpen(props.isOpen);
  },[props.isOpen]);

  function handleChange(event) {
    setFields({ ...contact, [event.target.name]: event.target.value });
  }

  function handleSubmit() {
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
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <Modal
        show={open}
        onHide={props.handleCloseAdd}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Agregar Contacto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                required
                value={contact.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Nombre"
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
                placeholder="Teléfono"
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
                placeholder="Dirección"
              />
            </div>
            <div className="btn-group d-flex justify-content-center">
              <input type="submit" value="Submit" className="btn btn-primary" />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={props.handleCloseAdd}>
            Cancelar
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ContactAdd;
