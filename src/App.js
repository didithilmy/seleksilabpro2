import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, NavLink, HashRouter} from "react-router-dom";
import Login from './components/routes/Login';
import Register from './components/routes/Register';


function App() {
  return (
    <div className="App">
      <HashRouter>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
      </HashRouter>
    </div>
  );
}

export default App;
