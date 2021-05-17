import {React,useState} from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

function ContactList() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        <button className="btn btn-primary" onClick={handleShow}>Open Modal</button>
      </h2>

      <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Don't even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
          <button className="btn btn-primary">Understood</button>
        </Modal.Footer>
      </Modal>
      </div>
      

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