// Importar dependencias necesarias
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Crear una nueva instancia de la aplicación Express
const app = express();

// Middleware para manejar CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Middleware para procesar los datos JSON en las solicitudes
app.use(express.json());

// Conectar a la base de datos MongoDB (ajusta la URI a tu configuración)
//comentar si aun no hay base de datos MongoDB
/*mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conectado a la base de datos'))
  .catch((err) => console.error('Error al conectar a la base de datos:', err));
*/

// Rutas de autenticación (login)
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes); // Prefijo para todas las rutas de autenticación

// Rutas para fases de la luna
const moonRoutes = require('./routes/moonRoutes');
app.use('/api/moon', moonRoutes); // Prefijo para las rutas relacionadas con las fases de la luna

// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Servidor funcionando correctamente!');
});

// Configurar el puerto
const port = process.env.PORT || 3600; // Puedes usar un puerto definido en .env o 3600 por defecto

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
