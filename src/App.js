import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, NavLink, HashRouter} from "react-router-dom";
import Login from './components/routes/Login';


function App() {
  return (
    <div className="App">
      <HashRouter>
          <Route exact path="/login" component={Login}/>
      </HashRouter>
    </div>
  );
}

export default App;
