// App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Importa los componentes de las páginas
import Login from './pages/login/login';
import Moon from './pages/moon-phases/moon-phases';
import WaterCycleGame from './pages/water-cycle/water-cycle';
import { ROUTES } from './routes'; // Importa las rutas definidas

function App() {
  return (
    <div>
      {/* Aquí puedes agregar un encabezado, navegación u otros componentes comunes */}
      
      <Routes>
      <Route path="/" element={<Navigate to={ROUTES.LOGIN} />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.MOON} element={<Moon />} />
        <Route path={ROUTES.WATER} element={<WaterCycleGame />} />
        {/* Ruta 404 */}
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>

      {/* Aquí puedes agregar un pie de página u otros elementos comunes */}
    </div>
  );
}

export default App;
