import React, {useState, useEffect} from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import './App.css';
import Form from './Form';
import axios from 'axios';
import * as yup from 'yup';
import schema from './formSchema'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sam's Pizza</h1>
        <h2>The best pizza ever</h2>
      <nav>
        <Link to='/form'>Order Online</Link>
      </nav>
      </header>
      <Route path='/form'>
        <Form/>
      </Route>
    </div>
  );
}

export default App;
