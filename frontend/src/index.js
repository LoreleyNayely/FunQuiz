import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import Moon from './pages/moon-phases/moon-phases';
import Login from './pages/login/login';

ReactDOM.render(
  <BrowserRouter>
<Login/>
    <Moon />
  </BrowserRouter>,
  document.getElementById('root')
);
