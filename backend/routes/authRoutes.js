const express = require('express');
const router = express.Router();

// Simulando la validación de un login (esto puede estar conectado a una base de datos)
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Aquí se verificaría con una base de datos, pero por ahora simulamos un login exitoso
  if (username === 'usuario' && password === 'contraseña') {
    res.json({ message: 'Login exitoso', token: 'fake-jwt-token' });
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
});

module.exports = router;
