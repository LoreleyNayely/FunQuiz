import React, { useState, useEffect } from 'react';
import './controls.css';

const images = require.context('../../../assets', false, /\.(png|jpe?g|svg)$/);

function Controls({ isFullscreen, setIsFullscreen, isSoundOn, setIsSoundOn, container, isPaused, setIsPaused, setIsStarted, resetGame }) {
  const [isRestarted, setIsRestarted] = useState(false);

  useEffect(() => {
    setIsStarted(true); // Permite que el personaje se mueva al cargar la página
  }, [setIsStarted]);

  const togglePause = () => {
    setIsPaused(prevState => !prevState);
    if (isPaused) {
      setIsStarted(true);
    }
  };

  const toggleSound = () => {
    setIsSoundOn(!isSoundOn);
  };

  const toggleFullscreen = () => {
    const element = document.querySelector(`.${container}`);
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
      document.exitFullscreen?.() ||
      document.webkitExitFullscreen?.() ||
      document.mozCancelFullScreen?.() ||
      document.msExitFullscreen?.();
      setIsFullscreen(false);
      // Elimina la clase fullscreen cuando salga del modo pantalla completa
      element.classList.remove('fullscreen');
    } else if (element) {
      element.requestFullscreen?.() ||
      element.webkitRequestFullscreen?.() ||
      element.mozRequestFullScreen?.() ||
      element.msRequestFullscreen?.();
      setIsFullscreen(true);
      // Agrega la clase fullscreen cuando entre en pantalla completa
      element.classList.add('fullscreen');
    }
  };
  

  const toggleStartRestart = () => {
    setIsStarted(true);
    setIsRestarted(prev => !prev);
    setIsPaused(false);
    resetGame();
  };

  return (
    <div className="controls-container">
      <div className="status-bar" aria-live="polite">
        <p>Estado: {isPaused ? "Pausado" : "Jugando"}</p>
      </div>

      <button 
        onClick={togglePause} 
        className="control-button pause-button" 
        title={isPaused ? "Reanudar" : "Pausa"} 
        disabled={isRestarted} 
        tabIndex="0"
        aria-label={isPaused ? "Reanudar el juego" : "Pausar el juego"}
      >
        <img
          src={images(isPaused ? './play-icon.png' : './pause-icon.png')}
          alt={isPaused ? "Icono de reanudar" : "Icono de pausa"}
          className="icon"
        />
      </button>

      <button 
        onClick={toggleStartRestart} 
        className="control-button start-restart-button" 
        title="Iniciar/Reiniciar" 
        tabIndex="0"
        aria-label="Iniciar o reiniciar el juego"
      >
        <img
          src={images('./restart-icon.png')}
          alt="Icono de iniciar o reiniciar"
          className="icon"
        />
      </button>

      <button 
        onClick={toggleSound} 
        className="control-button sound-button" 
        title={isSoundOn ? "Desactivar sonido" : "Activar sonido"} 
        tabIndex="0"
        aria-label={isSoundOn ? "Desactivar el sonido" : "Activar el sonido"}
      >
        <img
          src={isSoundOn ? images('./sound-on-icon.png') : images('./sound-off-icon.png')}
          alt={isSoundOn ? "Icono de sonido activado" : "Icono de sonido desactivado"}
          className="icon"
        />
      </button>

      <button 
        onClick={toggleFullscreen} 
        className="control-button fullscreen-button" 
        title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"} 
        tabIndex="0"
        aria-label={isFullscreen ? "Salir de pantalla completa" : "Activar pantalla completa"}
      >
        <img
          src={isFullscreen ? images('./normalscreen-icon.png') : images('./fullscreen-icon.png')}
          alt={isFullscreen ? "Icono de pantalla normal" : "Icono de pantalla completa"}
          className="icon"
        />
      </button>
    </div>
  );
}

export default Controls;
