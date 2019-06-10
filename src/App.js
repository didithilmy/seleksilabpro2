import React from 'react';
import './App.css';
import {Route, NavLink, BrowserRouter} from "react-router-dom";
import Login from './components/routes/Login';
import Register from './components/routes/Register';
import Home from './components/routes/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/" component={Home}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
