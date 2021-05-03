import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function OrderList() {
  const orders = useSelector((state) => {
    return state.orders;
  });

  return (
    <div>
      <h2>
        Orders
        <Link to="/orders/new" className="btn btn-primary float-right">
          Create Order
        </Link>
      </h2>
      {orders.length && orders.map((order)=>{
        return (
          <div key={order._id}>
            <hr/>
            <h4><Link to={`/orders/${order._id}`}>{order.clientName}</Link></h4>
            <p>Fecha: {order.date}</p>
            <p>N°orden: {order.order}</p>
          </div>
        )
      })}
    </div>
  );
}

export default OrderList;