import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import App from "./App";
import rootReducer from "./reducers";
import { setContacts } from "./actions"
import { setOrders } from "./actions";
 
const store = createStore(rootReducer, applyMiddleware(thunk, logger));

store.dispatch(setContacts());
store.dispatch(setOrders());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);