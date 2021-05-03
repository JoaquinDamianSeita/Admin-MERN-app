import React from 'react';
import {BrowserRouter as Router, Route, NavLink, Switch} from 'react-router-dom';
import './App.css';
import About from './components/pages/About';
import ContactList from './components/contacts/ContactList';
import ContactInfo from './components/contacts/ContactInfo';
import ContactAdd from './components/contacts/ContactAdd';
import ContactEdit from './components/contacts/ContactEdit';
import OrderAdd from "./components/orders/OrderAdd";
import OrderEdit from "./components/orders/OrderEdit";
import OrderInfo from "./components/orders/OrderInfo";
import OrderList from "./components/orders/OrderList";

//reemplazar los articles con contact

function App() {
  return (
    <div className="App">     
      <Router>
        <Navigation />
        <div className="container">
          <Main />
        </div>
      </Router>
    </div>
  );
}

function Navigation() {
  return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className='container'>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/contacts">Contacts</NavLink></li>
          <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/orders">Orders</NavLink></li>
          <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/">About</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}

function Main() {
  return(
    <Switch>
      <Route exact path="/" component={About} />
      <Route exact path="/contacts" component={ContactList} />
      <Route exact path="/contacts/new" component={ContactAdd} />
      <Route exact path="/contacts/:_id" component={ContactInfo} />
      <Route exact path="/contacts/:_id/edit" component={ContactEdit} />

      <Route exact path="/orders" component={OrderList} />
      <Route exact path="/orders/new" component={OrderAdd} />
      <Route exact path="/orders/:_id" component={OrderInfo} />
      <Route exact path="/orders/:_id/edit" component={OrderEdit} />
    </Switch>
  );
}

export default App;