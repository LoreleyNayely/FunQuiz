import React, { useState, useEffect } from 'react';
import './login.css';


// Usamos require.context para importar todas las imágenes de la carpeta 'assets'
const images = require.context('../../assets', false, /\.(png|jpe?g|svg)$/);

function Login() {
  const [showCard, setShowCard] = useState(false);
  const [username, setUsername] = useState('');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    // Mostrar la tarjeta después de un segundo
    const timer = setTimeout(() => {
      setShowCard(true);
    }, 1000);

    return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta
  }, []);

  const handleLogin = () => {
    if (!username.trim()) {
      setShowError(true);
      setTimeout(() => {
        document.getElementById("username-input").focus();
      }, 100); // Breve retraso para asegurar que el mensaje de error sea leído primero
    } else {
      setShowError(false);
      localStorage.setItem('username', username); // Store the username
      window.location.href = '/muscles-bones';
    }
  };

  return (
    <div className="container full-screen">
      <div className="header-image" tabIndex={1}>
        <img 
          src={images('./Login3.png')} 
          alt="FunQuiz Academy Logo" 
          aria-label="Logo de FunQuiz Academy"
        />
      </div>
      {showCard && (
        <div className="overlay-card" tabIndex={2}>
          <div className="card-content">
            <h2 tabIndex={3}>Bienvenido a FunQuiz</h2>
            <p tabIndex={4}>Por favor, ingresa un nombre de usuario para poder continuar:</p>
            {showError && (
              <p className="error-message" aria-live="assertive" tabIndex={5}>
                Ingresa un nombre de usuario.
              </p>
            )}
            <input
              id="username-input"
              type="text"
              placeholder="Nombre de usuario"
              className="username-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              tabIndex={6}
              aria-label="Campo para ingresar nombre de usuario"
            />
            <button
              type="button"
              className="btn"
              onClick={handleLogin}
              tabIndex={7}
            >
              Ingresar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;