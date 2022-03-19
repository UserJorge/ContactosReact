import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import Dashboard from './Dashboard';
import PersonList from './components/PersonList';
import App from './App';
import AgregarContacto from './components/AgregarContacto';
import EliminarContacto from './components/EliminarContacto';
import reportWebVitals from './reportWebVitals';
ReactDOM.render( 

  <App/>

  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
