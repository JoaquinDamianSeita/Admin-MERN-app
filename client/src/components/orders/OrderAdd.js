import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { post } from "axios";
import { addOrder } from "../../actions";
import { Modal } from "react-bootstrap";

function OrderAdd(props) {
  const workInitialState = {
    typeWork: "",
    detail: "",
    price: 0,
  };

  const initialState = {
    clientName: "",
    clientId: null,
    date: "",
    worksArray: [],
    observaciones: "",
  };

  const [work, setWorkFields] = useState(workInitialState);
  const [order, setOrderFields] = useState(initialState);
  const [arrayWorksTemp, setWorksArray] = useState([]);
  const [open, setOpen] = useState(props.isOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(props.isOpen);
    // console.log(props.isOpen);
    if (props.isOpen === false) {
      setWorkFields(workInitialState);
      setOrderFields(initialState);
      setWorksArray([]);
    }
  }, [props.isOpen]);

  function handleOrderChange(event) {
    setOrderFields({ ...order, [event.target.name]: event.target.value });
  }

  function handleWorkChange(event) {
    setWorkFields({ ...work, [event.target.name]: event.target.value });
  }

  function confirmWorkItem(event) {
    event.preventDefault();

    if (work.typeWork || work.price) {
      setWorksArray([...arrayWorksTemp, work]);
      // console.log(order);
      // console.log(work);
      // console.log(arrayWorksTemp);
    }
  }

  function displayWorksItems() {
    return arrayWorksTemp.map((work, i) => {
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
          <div className="col-3">
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
          <div className="col-1">
            <button
              className="btn btn-danger"
              onClick={(event) => {
                event.preventDefault();
                arrayWorksTemp.pop(work);
                setWorksArray([...arrayWorksTemp]);
              }}
            >
              X
            </button>
          </div>
        </div>
      );
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    order.worksArray = arrayWorksTemp;
    if (
      order.clientName ||
      order.date ||
      order.worksArray ||
      order.observaciones
    )
      return post("/api/orders", {
        clientId: order.clientId,
        clientName: order.clientName,
        date: order.date,
        worksArray: order.worksArray,
        observaciones: order.observaciones,
      })
        .then((response) => {
          dispatch(addOrder(response.data));
          props.handleCloseAdd();
        })
        .catch((error) => {
          console.log(error);
        });
  }

  return (
    <div>
      <Modal
        show={open}
        onHide={props.handleCloseAdd}
        dialogClassName="modal-45p"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Agregar Orden</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="row form-group">
              <div className="col-6">
                <input
                  type="text"
                  name="clientName"
                  required
                  value={order.clientName}
                  onChange={handleOrderChange}
                  className="form-control"
                  placeholder="Client Name"
                />
              </div>
              <div className="col-6 pr-5">
                <input
                  type="date"
                  name="date"
                  required
                  value={order.date}
                  onChange={handleOrderChange}
                  className="form-control"
                />
              </div>
            </div>
            <hr />

            {/* esta funcion muestra los trabajos asociados a la orden en tiempo real */}
            <div>{displayWorksItems()}</div>

            <div className="row form-group">
              <div className="col-4">
                <input
                  type="text"
                  name="typeWork"
                  placeholder="Tipo de trabajo"
                  onChange={handleWorkChange}
                  className="form-control"
                />
              </div>
              <div className="col-3">
                <input
                  type="text"
                  name="detail"
                  value={work.detail}
                  placeholder="Detalle"
                  onChange={handleWorkChange}
                  className="form-control"
                />
              </div>
              <div className="col-3">
                <input
                  type="number"
                  name="price"
                  value={work.price}
                  placeholder="Precio"
                  onChange={handleWorkChange}
                  className="form-control"
                />
              </div>
              <div className="col-1">
                <button className="btn btn-primary" onClick={confirmWorkItem}>
                  Add
                </button>
              </div>
            </div>

            <div className="form-group">
              <textarea
                type="text"
                name="observaciones"
                value={order.observaciones}
                placeholder="Observaciones"
                onChange={handleOrderChange}
                className="form-control"
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

export default OrderAdd;
