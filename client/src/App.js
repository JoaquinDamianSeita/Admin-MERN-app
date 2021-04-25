import React from 'react';
import {BrowserRouter as Router, Route, NavLink, Switch} from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import ContactList from './components/contacts/ContactList';
import ContactInfo from './components/contacts/ContactInfo';
import ContactAdd from './components/contacts/ContactAdd';
import ContactEdit from './components/contacts/ContactEdit';

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
          <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/">Home</NavLink></li>
          <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/contacts">Contacts</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}

function Main() {
  return(
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/contacts" component={ArticleList} />
      <Route exact path="/contacts/new" component={ArticleAdd} />
      <Route exact path="/contacts/:_id" component={ArticleInfo} />
      <Route exact path="/contacts/:_id/edit" component={ArticleEdit} />
    </Switch>
  );
}

export default App;