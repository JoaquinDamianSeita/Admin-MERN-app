import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { setOrder, removeOrder } from "../../actions";

function OrderInfo(props) {
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`/api/orders/${props.match.params._id}`)
      .then((response) => {
        dispatch(setOrder(response.data));
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [dispatch, props]);



  
}
