import React from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes';

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
        <button type="submit" className="btn">
          Ingresar
        </button>
      </form>
      <div className="forgot-password">
        <a href={ROUTES.MOON}>¿Olvidaste la contraseña?</a>
      </div>
      <div className="register-links">
        <a href="https://github.com/LoreleyNayely/FunQuiz">¿No tienes cuenta?</a>
        <Link to={ROUTES.MOON}>Regístrate</Link>

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
