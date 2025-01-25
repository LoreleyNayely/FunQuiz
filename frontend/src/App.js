import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/login';
import { ROUTES } from './routes';  // Importamos las rutas
import Moon from './pages/moon-phases/moon-phases';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.MOON} element={<Moon />} />
        
      </Routes>
    </Router>
  );
}

export default App;
