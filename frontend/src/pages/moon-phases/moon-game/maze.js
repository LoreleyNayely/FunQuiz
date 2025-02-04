import React, { useState, useEffect, useCallback } from 'react';
import Player from './player';
import Timer from './timer';
import Controls from './controls';
import './maze.css';
import wallHitSound from './sounds/wall_hit.mp3';
const images = require.context('../../../assets', false, /\.(png|jpe?g|svg)$/);

const mazeLayout = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1],
  [1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 0, 0, 2, 2, 0, 1],
  [1, 0, 1, 1, 0, 0, 0, 2, 2, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const Maze = () => {
  const initialPosition = { x: 1, y: 1 }; // Posición inicial del jugador
  const [playerPosition, setPlayerPosition] = useState(initialPosition);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isVictory, setIsVictory] = useState(false); // Estado para controlar si hay victoria

  const handleKeyDown = useCallback(
    (event) => {
      if (isPaused || !isStarted || isVictory) return;
      // Solo prevenir el comportamiento por defecto si es una tecla de dirección
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
        event.preventDefault(); // Evita que se recargue la página al presionar las flechas de movimiento
      }
      const { x, y } = playerPosition;
      let canMove = false;

      switch (event.key) {
        case 'ArrowLeft':
          if (mazeLayout[y - 1]?.[x] === 0 || mazeLayout[y - 1]?.[x] === 2) {
            setPlayerPosition((prev) => ({ ...prev, y: prev.y - 1 }));
            canMove = true;
          }
          break;
        case 'ArrowRight':
          if (mazeLayout[y + 1]?.[x] === 0 || mazeLayout[y + 1]?.[x] === 2) {
            setPlayerPosition((prev) => ({ ...prev, y: prev.y + 1 }));
            canMove = true;
          }
          break;
        case 'ArrowUp':
          if (mazeLayout[y]?.[x - 1] === 0 || mazeLayout[y]?.[x - 1] === 2) {
            setPlayerPosition((prev) => ({ ...prev, x: prev.x - 1 }));
            canMove = true;
          }
          break;
        case 'ArrowDown':
          if (mazeLayout[y]?.[x + 1] === 0 || mazeLayout[y]?.[x + 1] === 2) {
            setPlayerPosition((prev) => ({ ...prev, x: prev.x + 1 }));
            canMove = true;
          }
          break;
        default:
          break;
      }
  

      if (!canMove && isSoundOn) {
        const audio = new Audio(wallHitSound);
        audio.play();
      }
          // Verificar si el jugador llegó a la celda de victoria
    if (mazeLayout[playerPosition.y][playerPosition.x] === 2) {
      setIsVictory(true); // Establecer la victoria inmediatamente
    }
    },
    [playerPosition, isSoundOn, isPaused, isStarted, isVictory]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const resetGame = () => {
    setPlayerPosition(initialPosition);
    setIsVictory(false); 
    setIsPaused(false);
    setIsStarted(true); // Inicia el juego al presionar el botón de inicio
  };

  return (
    <div className="maze-container" aria-label="Juego de Laberinto">
      {/* Temporizador envuelto en un div para que sea accesible con Tab */}
     
        <Timer isStarted={isStarted} isPaused={isPaused}/>
       

      <div className="maze" tabIndex="0" aria-label="Laberinto">
        {mazeLayout.map((row, y) => (
          <div key={y} className="row">
            {row.map((cell, x) => (
              <div
                key={x}
                className={`cell ${cell === 1 ? 'wall' : 'path'}`}
                tabIndex="-1"
              >
                {/* El jugador ahora es accesible con tabIndex 0 y renderizado correctamente */}
                {playerPosition.x === x && playerPosition.y === y && (
                    <Player/>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
       {/* Mostrar imagen de victoria si el jugador ha ganado */}
       {isVictory && (
        <div className="victory-message" >
          <img src={images('./victory-creciente.png')} tabIndex="0" alt="¡Misión cumplida!, ¡Luna creciente encontrada!" />
        </div>
      )}
      <Controls
        isFullscreen={isFullscreen}
        setIsFullscreen={setIsFullscreen}
        isSoundOn={isSoundOn}
        setIsSoundOn={setIsSoundOn}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
        setIsStarted={setIsStarted}
        resetGame={resetGame} // Paso la función al componente Controls
        container="maze-container"
        tabIndex="2"
        alt="Controles del juego"
      />
    </div>
  );
  
};

export default Maze;