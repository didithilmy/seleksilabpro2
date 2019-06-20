import React from 'react';
import './App.css';
import {Route, NavLink, BrowserRouter} from "react-router-dom";
import Login from './components/routes/Login';
import Register from './components/routes/Register';
import Home from './components/routes/Home';
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <div className="App">
        <CookiesProvider>
            <BrowserRouter>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/" component={Home}/>
            </BrowserRouter>
        </CookiesProvider>
    </div>
  );
}

export default App;
