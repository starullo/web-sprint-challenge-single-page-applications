import React, {useState, useEffect} from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import './App.css';
import Form from './Form';
import axios from 'axios';
import * as yup from 'yup';
import schema from './formSchema'


function App() {
  return (
    <div>
      <header>
        <h1>Sam's Pizza</h1>
        <h2>The best pizza ever</h2>
      <nav>
        <Link to='/'><h2>Home</h2></Link>
        <Link to='/pizza'><h2>Order Online</h2></Link>
      </nav>
      </header>
      <Switch>
      <Route path='/pizza'>
        <Form/>
      </Route>
      <Route path='/'>
      <p>Welcome to the website for the greatest pizza place in the history of everything hooray. Do you want to order something or what? Call or click the link above to order online</p>
      </Route>
      </Switch>
    </div>
  );
}

export default App;
