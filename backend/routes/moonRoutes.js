const express = require('express');
const router = express.Router();

// Simulando las fases de la luna (esto puede estar conectado a una base de datos o API externa)
router.get('/phases', (req, res) => {
  const phases = [
    { phase: 'Luna Nueva', date: '2025-01-26' },
    { phase: 'Cuarto Creciente', date: '2025-02-02' },
    { phase: 'Luna Llena', date: '2025-02-09' },
    { phase: 'Cuarto Menguante', date: '2025-02-16' },
  ];
  res.json(phases);
});

module.exports = router;
