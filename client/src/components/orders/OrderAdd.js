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

  function confirmWorkItem() {
    setWorksArray(...arrayWorksTemp, work);
    setWorkFields(workInitialState);
    console.log(arrayWorksTemp);
  }

  function handleSubmit(event) {
    order.worksArray = arrayWorksTemp;

    event.preventDefault();
    if (
      !order.clientName ||
      !order.date ||
      !order.worksArray ||
      !order.observaciones
    )
      return post("/api/orders", {
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
      <h4>Add Order</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="clientName"
          required
          value={order.clientName}
          onChange={handleOrderChange}
          className="form-control"
          placeholder="Client Name"
        />
        <input
          type="date"
          name="date"
          required
          value={order.date}
          onChange={handleOrderChange}
          className="form-control"
        />
        {/* {arrayWorksTemp.map((work) => {
          return (
            <div>
              <input
                type="text"
                value={work.typeWork}
                className="form-control"
                placeholder={work.typeWork}
              />
              <input
                type="text"
                value={work.detail}
                className="form-control"
                placeholder={work.detail}
              />
              <input
                type="text"
                value={work.price}
                className="form-control"
                placeholder={work.price}
              />
            </div>
          );
        })} */}
        <input
          type="text"
          name="typeWork"
          value={work.typeWork}
          placeholder="Tipo de trabajo"
          required
          onChange={handleWorkChange}
          className="form-control"
        />
        <input
          type="text"
          name="detail"
          value={work.detail}
          placeholder="Detalle"
          required
          onChange={handleWorkChange}
          className="form-control"
        />
        <input
          type="number"
          name="price"
          value={work.price}
          placeholder="Precio"
          required
          onChange={handleWorkChange}
          className="form-control"
        />
        <button className="form-control" onClick={confirmWorkItem}></button>

        <input
          type="text"
          name="observaciones"
          value={order.observaciones}
          placeholder="Observaciones"
          onChange={handleWorkChange}
          className="form-control"
        />
      </form>
    </div>
  );
}

export default OrderAdd;
