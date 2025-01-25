import React from 'react';
import './login.css';
import { Link } from 'react-router-dom';

// Usamos require.context para importar todas las imágenes de la carpeta 'assets'
const images = require.context('../../assets', false, /\.(png|jpe?g|svg)$/);

function Login() {
  return (
    <div className="container full-screen">
      <div className="logo">
        <img src={images('./funquiz_login.png')} alt="FunQuiz Academy Logo" />
      </div>
      <form>
        <div className="form-group">
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Ingrese su usuario"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Ingrese su contraseña"
          />
        </div>
        <Link to="/moon-phases">
          <button type="button" className="btn">
            Ingresar
          </button>
        </Link>
      </form>
      <div className="forgot-password">
      <Link to="/moon-phases">¿Olvidaste la contraseña?</Link>
      </div>
      <div className="register-links">
        <Link to="/moon-phases">¿No tienes cuenta?</Link>
        <Link to="/moon-phases">Regístrate</Link>

      </div>
      <div className="social-login">
        <div className="social-item">
          <img src={images('./facebook.png')} alt="Logo Facebook" />
          <button className="facebook">Registrarse con Facebook</button>
        </div>
        <div className="social-item">
          <img src={images('./gmail.png')} alt="Logo Gmail" />
          <button className="google">Registrarse con Gmail</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
