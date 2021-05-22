import { React, useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardDeck, Col, Row } from "react-bootstrap";
import OrderAdd from "./OrderAdd";
import OrderInfo from "./OrderInfo";

function OrderList() {
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

  const orders = useSelector((state) => {
    return state.orders;
  });

  return (
    <div>
      <h2>
        Ordenes
        <button className="btn btn-primary float-right" onClick={handleShowAdd}>
          Crear Orden
        </button>
      </h2>

      <div>
        <OrderAdd isOpen={showAdd} handleCloseAdd={handleCloseAdd}></OrderAdd>
      </div>

      <div>
        <OrderInfo isOpen={showInfo} handleCloseInfo={handleCloseInfo} orderId={tempContactId}></OrderInfo>
      </div>

      <Row>
        <CardDeck>
          {orders.length &&
            orders.map((order) => {
              return (
                <Col xs={12} md={6} xl={4} >
                  <Card
                    className="text-center"
                    bg="dark"
                    text="light"
                    key={order._id}
                    style={{
                      width:"15rem",
                      height:"12rem",
                      margin:"0 10rem 2rem 0",
                    }}
                  >
                    <Card.Body>
                      <Card.Title>{order.order}</Card.Title>
                      <Card.Text>Fecha: {order.date}</Card.Text>
                      <Card.Text>Nombre Cliente: {order.clientName}</Card.Text>
                      <Card.Subtitle className="mb-2 text-muted">
                        Id: {order.clientId}
                      </Card.Subtitle>
                      <Card.Link
                        onClick={() => handleShowInfo(String(order._id))}
                      >
                        {" "}
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

export default OrderList;
