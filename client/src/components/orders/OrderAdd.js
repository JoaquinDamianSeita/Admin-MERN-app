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
    worksArray: [workInitialState],
    observaciones: "",
  };

  const [work, setWorkFields] = useState(workInitialState);
  const [order, setOrderFields] = useState(initialState);
  const dispatch = useDispatch();

  function handleOrderChange(event) {
    setOrderFields({ ...order, [event.target.name]: event.target.value });
  }

  function handleWorkChange(event) {
    setWorkFields({ ...work, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
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
        <input type="" />
      </form>
    </div>
  );
}
