import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { post } from "axios";
import { addOrder } from "../../actions";

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

  const dispatch = useDispatch();

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
      setWorkFields(workInitialState);
      console.log(order);
      // console.log(work);
      // console.log(arrayWorksTemp);
    }
  }

  function displayWorksItems() {
    return arrayWorksTemp.map((work, i) => {
      return (
        <div key={i} className="row form-group">
          <div className="col-3">
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
          <div className="col-2">
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
        clientId:order.clientId,
        clientName: order.clientName,
        date: order.date,
        worksArray: order.worksArray,
        observaciones: order.observaciones,
      })
        .then((response) => {
          dispatch(addOrder(response.data));
        })
        .then(() => {
          props.history.push("/orders");
        })
        .catch((error) => {
          console.log(error);
        });
  }

  function handleCancel() {
    props.history.push("/orders");
  }

  return (
    <div>
      <h2 className="text-center m-5">Add Order</h2>
      <div className="d-flex justify-content-center formBox ">
        <form onSubmit={handleSubmit} className="container">
          <div className="row form-group">
            <div className="col-xl-5">
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
            <div className="col-xl-4 pr-5">
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
          {displayWorksItems()}

          <div className="row form-group">
            <div className="col-md-3">
              <input
                type="text"
                name="typeWork"
                value={work.typeWork}
                placeholder="Tipo de trabajo"
                onChange={handleWorkChange}
                className="form-control"
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                name="detail"
                value={work.detail}
                placeholder="Detalle"
                onChange={handleWorkChange}
                className="form-control"
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                name="price"
                value={work.price}
                placeholder="Precio"
                onChange={handleWorkChange}
                className="form-control"
              />
            </div>
            <div className="col">
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
          <div className="d-flex justify-content-center">
            <div className="btn-group">
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary px-5"
              />
              <input
                type="button"
                value="Cancel"
                className="btn btn-secondary"
                onClick={handleCancel}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrderAdd;
