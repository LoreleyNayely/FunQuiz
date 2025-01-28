import React, { useState, useEffect, useCallback } from 'react';
import Player from './player';
import './maze.css'; // Importa los estilos del laberinto
import wallHitSound from './sounds/wall_hit.mp3'; // Importa el archivo de sonido

// Mueve mazeLayout fuera del componente para evitar recrearlo en cada renderizado
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
    [1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const Maze = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 });

  // useCallback para memoizar handleKeyDown
  const handleKeyDown = useCallback(
    (event) => {
      const { x, y } = playerPosition;
      let canMove = false;

      switch (event.key) {
        case 'ArrowLeft':
          if (mazeLayout[y - 1] && mazeLayout[y - 1][x] === 0) {
            setPlayerPosition((prev) => ({ ...prev, y: prev.y - 1 }));
            canMove = true;
          }
          break;
        case 'ArrowRight':
          if (mazeLayout[y + 1] && mazeLayout[y + 1][x] === 0) {
            setPlayerPosition((prev) => ({ ...prev, y: prev.y + 1 }));
            canMove = true;
          }
          break;
        case 'ArrowUp':
          if (mazeLayout[y][x - 1] === 0) {
            setPlayerPosition((prev) => ({ ...prev, x: prev.x - 1 }));
            canMove = true;
          }
          break;
        case 'ArrowDown':
          if (mazeLayout[y][x + 1] === 0) {
            setPlayerPosition((prev) => ({ ...prev, x: prev.x + 1 }));
            canMove = true;
          }
          break;
        default:
          break;
      }

      // Si no puede moverse, reproduce el sonido de colisión
      if (!canMove) {
        const audio = new Audio(wallHitSound); // Usa el archivo de sonido importado
        audio.play();
      }
    },
    [playerPosition] // Dependencias de useCallback
  );

  // useEffect para manejar eventos de teclado
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]); // handleKeyDown está en el array de dependencias

  return (
    <div className="maze">
      {mazeLayout.map((row, y) => (
        <div key={y} className="row">
          {row.map((cell, x) => (
            <div key={x} className={`cell ${cell === 1 ? 'wall' : 'path'}`}>
              {playerPosition.x === x && playerPosition.y === y && <Player />}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Maze;