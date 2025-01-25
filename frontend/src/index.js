// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App'; // Aquí solo se importa App.js

// Renderiza el componente App que contiene las rutas
ReactDOM.render(
  <BrowserRouter>
    <App /> {/* El enrutamiento y las rutas están en App */}
  </BrowserRouter>,
  document.getElementById('root')
);
