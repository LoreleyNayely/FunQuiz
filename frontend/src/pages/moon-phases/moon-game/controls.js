import React, { useState } from 'react';
import './controls.css';

// Importando imágenes usando require.context
const images = require.context('../../../assets', false, /\.(png|jpe?g|svg)$/);

function Controls({ isFullscreen, setIsFullscreen, isSoundOn, setIsSoundOn, container }) {
  const [isPaused, setIsPaused] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isRestarted, setIsRestarted] = useState(false);

  // Función para alternar entre Pausa/Play
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // Función para alternar entre Sonido On/Off
  const toggleSound = () => {
    setIsSoundOn(!isSoundOn);
  };

  // Función para alternar Pantalla Completa
  const toggleFullscreen = () => {
    const element = document.querySelector(`.${container}`);
    if (element) {
      if (!isFullscreen) {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  // Función para alternar Iniciar/Reiniciar
  const toggleStartRestart = () => {
    setIsStarted(!isStarted);
    setIsRestarted(!isRestarted);
  };

  return (
    <div className="controls-container">
      {/* Barra de estado */}
      <div className="status-bar">
        <p>Estado: {isStarted ? "Jugando" : "Detenido"}</p>
      </div>

      {/* Botón de Pausa/Play */}
      <button onClick={togglePause} className="control-button pause-button" title={isPaused ? "Reanudar" : "Pausa"}>
        <img
          src={images(isPaused ? './play-icon.png' : './pause-icon.png')}
          alt={isPaused ? "Reanudar" : "Pausa"}
          className="icon"
        />
      </button>

      {/* Botón de Iniciar/Reiniciar */}
      <button onClick={toggleStartRestart} className="control-button start-restart-button" title={isStarted ? "Reiniciar" : "Iniciar"}>
        <img
          src={images(isStarted ? './restart-icon.png' : './play-icon.png')}
          alt={isStarted ? "Reiniciar" : "Iniciar"}
          className="icon"
        />
      </button>

      {/* Botón de Sonido */}
      <button onClick={toggleSound} className="control-button sound-button" title={isSoundOn ? "Desactivar sonido" : "Activar sonido"}>
        <img
          src={isSoundOn ? images('./sound-on-icon.png') : images('./sound-off-icon.png')}
          alt={isSoundOn ? "Sonido activado" : "Sonido desactivado"}
          className="icon"
        />
      </button>

      {/* Botón de Pantalla Completa */}
      <button onClick={toggleFullscreen} className="control-button fullscreen-button" title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}>
        <img
          src={isFullscreen ? images('./normalscreen-icon.png') : images('./fullscreen-icon.png')}
          alt={isFullscreen ? "Pantalla normal" : "Pantalla completa"}
          className="icon"
        />
      </button>
    </div>
  );
}

export default Controls;
