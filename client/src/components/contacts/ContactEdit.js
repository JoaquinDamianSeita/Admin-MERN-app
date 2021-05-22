import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { patch } from "axios";
import { setContact, replaceContact } from "../../actions";
import {  Col, Form, Modal, Row } from "react-bootstrap";

function ContactEdit(props) {
  const [open, setOpen] = useState(props.isOpen);
  const initialState = useSelector((state) => state.contact);
  let [contact, changeContact] = useState(initialState);
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(props.isOpen);
  }, [props.isOpen]);

  useEffect(() => {
    changeContact(initialState);
  },[props.contactId]);

  function handleChange(event) {
    changeContact({
      ...contact,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    patch(`/api/contacts/${props.contactId}`, {
      name: contact.name,
      tel: contact.tel,
      email: contact.email,
      adress: contact.adress,
    })
      .then(() => {
        dispatch(setContact(contact));
        dispatch(replaceContact(contact));
      })
      .catch((error) => {
        console.log(error);
      });
      props.handleCloseEdit();
  }

  return (
    <div>
      <Modal
        show={open}
        onHide={props.handleCloseEdit}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar {contact.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Nombre:
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  name="name"
                  defaultValue={contact.name}
                  onChange={handleChange}
                ></Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Teléfono:
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  name="tel"
                  defaultValue={contact.tel}
                  onChange={handleChange}
                ></Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Dirección:
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  name="adress"
                  defaultValue={contact.adress}
                  onChange={handleChange}
                ></Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Email:
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  name="email"
                  defaultValue={contact.email}
                  onChange={handleChange}
                ></Form.Control>
              </Col>
            </Form.Group>
          </form>

          <div className="btn-group d-flex justify-content-center">
            <input type="submit" value="Confirmar Cambios" className="btn btn-primary" onClick={handleSubmit} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={props.handleCloseEdit}>
            Cancelar
          </button>
        </Modal.Footer>
      </Modal>

      {/* <h1>Edit {contact.name}</h1>
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
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form> */}
    </div>
  );
}

export default ContactEdit;
