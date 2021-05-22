import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { setOrder, removeOrder } from "../../actions";

function OrderInfo(props) {
  const [open, setOpen] = useState(props.isOpen);
  const [showEdit, setShowEdit] = useState(false);
  const [tempOrderId, setTempOrderId] = useState("");

  const order = useSelector((state) => state.order);
  const [listWorks, setListWorks] = useState([]);
  const dispatch = useDispatch();

  function handleCloseEdit() {
    setShowEdit(false);
  }

  function handleShowEdit(id) {
    setTempOrderId(id);
    setShowEdit(true);
  }

  useEffect(() => {
    setOpen(props.isOpen);
  }, [props.isOpen]);

  useEffect(() => {
    axios
      .get(`/api/orders/${props.orderId}`)
      .then((response) => {
        dispatch(setOrder(response.data));
        setListWorks(response.data.worksArray);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [dispatch, props]);

  function handleDelete() {
    axios
      .delete(`/api/orders/${order._id}`)
      .then(() => {
        dispatch(removeOrder(order._id));
      })
      .catch((error) => {
        console.log("error", error);
      });
      props.handleCloseInfo();
  }

  function displayWorksItems() {
    if (listWorks) {
      return listWorks.map((work, i) => {
        return (
          <div key={i} className="row form-group">
            <div className="col-4">
              <input
                type="text"
                value={work.typeWork}
                className="form-control"
                placeholder={work.typeWork}
                disabled
              />
            </div>
            <div className="col-4">
              <input
                type="text"
                value={work.detail}
                className="form-control"
                placeholder={work.detail}
                disabled
              />
            </div>
            <div className="col-3">
              <input
                type="text"
                value={work.price}
                className="form-control"
                placeholder={work.price}
                disabled
              />
            </div>
          </div>
        );
      });
    }
  }

  return (
    <div>
      <Modal
        show={open}
        onHide={props.handleCloseInfo}
        dialogClassName="modal-45p"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Info {order.order}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column xl={1} className="ml-3 px-0">
                Fecha:
              </Form.Label>
              <Col xl={3}>
                <Form.Control value={order.date} readOnly></Form.Control>
              </Col>
              <Form.Label column xl={3} className="px-0">
                Nombre del Cliente:
              </Form.Label>
              <Col xl={4} className="px-0">
                <Form.Control value={order.clientName} readOnly></Form.Control>
              </Col>
            </Form.Group>
            <hr />
            {/* esta funcion muestra los trabajos asociados a la orden en tiempo real */}
            <div>
            <Form.Label>
                Trabajos:
            </Form.Label>
            {displayWorksItems()}</div>
            <Form.Label>
                Observaciones:
            </Form.Label>
            <Form.Control value={order.observaciones} readOnly></Form.Control>
          </Form>

          <hr/>

          <div className="btn-group mt-3 d-flex justify-content-between">
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
      </Modal>
    </div>
  );
}
export default OrderInfo;
