import React from 'react';
import './App.css';
import {Route, NavLink, BrowserRouter} from "react-router-dom";
import Login from './components/routes/Login';
import Register from './components/routes/Register';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
