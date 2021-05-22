import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Col, Form, Modal, Row, ThemeProvider } from "react-bootstrap";
import ContactEdit from "./ContactEdit";

import { setContact, removeContact } from "../../actions";

function ContactInfo(props) {
  const [open, setOpen] = useState(props.isOpen);
  const [showEdit, setShowEdit] = useState(false);
  const [tempContactId, setTempContactId] = useState("");
  const contact = useSelector((state) => state.contact);
  const dispatch = useDispatch();

  function handleCloseEdit(){
    setShowEdit(false);
  }

  function handleShowEdit(id) {
    setTempContactId(id);
    setShowEdit(true);
  }

  useEffect(() => {
    setOpen(props.isOpen);
  }, [props.isOpen]);

  useEffect(() => {
    axios
      .get(`/api/contacts/${props.contactId}`)
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
      })
      .catch((error) => {
        console.log("error", error);
      });
    props.handleCloseInfo();
  }
  return (
    <div>
      <Modal
        show={open}
        onHide={props.handleCloseInfo}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
          Info {contact.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Nombre:
              </Form.Label>
              <Col sm={10}>
                <Form.Control value={contact.name} readOnly></Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Teléfono:
              </Form.Label>
              <Col sm={10}>
                <Form.Control value={contact.tel} readOnly></Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Dirección:
              </Form.Label>
              <Col sm={10}>
                <Form.Control value={contact.adress} readOnly></Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Email:
              </Form.Label>
              <Col sm={10}>
                <Form.Control value={contact.email} readOnly></Form.Control>
              </Col>
            </Form.Group>
          </Form>

          <div className="btn-group">
            <button className="btn btn-warning" onClick={()=>handleShowEdit(String(props.contactId))}>Editar</button>
            <button
              className="btn btn-danger"
              type="button"
              onClick={handleDelete}
            >
              Borrar
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={props.handleCloseInfo}>
            Cancelar
          </button>
        </Modal.Footer>
      </Modal>

      <div>
        <ContactEdit
          contactId={tempContactId}
          isOpen={showEdit}
          handleCloseEdit={handleCloseEdit}
        ></ContactEdit>
      </div>
    </div>
  );
}

export default ContactInfo;
