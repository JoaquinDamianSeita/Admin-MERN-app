import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { setOrder, removeOrder } from "../../actions";

function OrderInfo(props) {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const [listWorks,setListWorks] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/orders/${props.match.params._id}`)
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
        props.history.push("/");
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
  
  return (
    <div>
      <h2>{order.clientName}</h2>
      <h5>Fecha {order.date}</h5>
      {listWorks.map((work)=>{
        return (<div>
          <p>{work.price}</p>
          <p>{work.typeWork}</p>
          <p>{work.detail}</p>
        </div>)
      })}
      <p>N° Orden {order.order}</p>
      <p>Observaciones {order.observaciones}</p>
      <p></p>
      <hr/>
      <div className="btn-group">
        <Link to={{ pathname:`/orders/${order._id}/edit`}} className="btn btn-info">Edit</Link>
        <button className="btn btn-danger" type="button" onClick={handleDelete}>Delete</button>
        <Link to="/" className="btn btn-secondary">Close</Link>
      </div>
      <hr/>
    </div>
  );
}
export default OrderInfo;
