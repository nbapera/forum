import './index.css';

import { BrowserRouter, Route } from 'react-router-dom'

import Header from './components/header/Header';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile'
import React from 'react';
import ReactDOM from 'react-dom';
import Register from './pages/register/Register';

ReactDOM.render(
  <BrowserRouter>
    <Header />
    <Route exact path="/" component={Home}/>
    <Route path="/login" component={Login}/>
    <Route path="/register" component={Register}/>
    <Route path="/user/:username" component={Profile} />
  </BrowserRouter>,
  document.getElementById('root')
);
