import { React, useState } from "react";
import { useSelector } from "react-redux";
import ContactAdd from "./ContactAdd";
import ContactInfo from "./ContactInfo";
import { Card, CardDeck, Col, Row } from "react-bootstrap";

function ContactList() {
  const [showAdd, setShowAdd] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [tempContactId, setTempContactId] = useState("");

  function handleCloseAdd() {
    setShowAdd(false);
  }

  function handleCloseInfo() {
    setShowInfo(false);
  }

  function handleShowAdd() {
    setShowAdd(true);
  }

  function handleShowInfo(id) {
    setTempContactId(id);
    setShowInfo(true);
  }

  const contacts = useSelector(function (state) {
    return state.contacts;
  });

  return (
    <div>
      <h2>
        Contactos
        <button className="btn btn-primary float-right" onClick={handleShowAdd}>
          Crear Contacto
        </button>
      </h2>
      <hr />

      <div>
        <ContactAdd
          isOpen={showAdd}
          handleCloseAdd={handleCloseAdd}
        ></ContactAdd>
      </div>

      <div>
        <ContactInfo
          contactId={tempContactId}
          isOpen={showInfo}
          handleCloseInfo={handleCloseInfo}
        ></ContactInfo>
      </div>

      <Row>
        <CardDeck>
          {contacts.length &&
            contacts.map(function (contact) {
              return (
                <Col xs={12} md={6} xl={4} className="mb-3">
                  <Card
                    className="text-center"
                    bg="dark"
                    text="light"
                    key={contact._id}
                    style={{
                      width:"19rem",
                      height:"11rem",
                      margin:"0 10rem 2rem 0",
                    }}
                  >
                    <Card.Body>
                      <Card.Title>{contact.name}</Card.Title>
                      <Card.Text>Teléfono {contact.tel}</Card.Text>
                      <Card.Subtitle className="mb-2 text-muted">
                        Id: {contact._id}
                      </Card.Subtitle>
                      <Card.Link
                        onClick={() => handleShowInfo(String(contact._id))}
                      >
                        Mas Info
                      </Card.Link>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </CardDeck>
      </Row>
    </div>
  );
}

export default ContactList;
