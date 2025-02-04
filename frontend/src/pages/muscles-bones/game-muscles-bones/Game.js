import React, { useState, useEffect, useCallback, useRef } from 'react';
import Label from './Label';
import BodyImage from './BodyImage';
import { FaPause, FaPlay, FaRedo } from 'react-icons/fa';
import correctSound from './../../../assets/sounds/correcto.mp3';
import wrongSound from './../../../assets/sounds/incorrecto.mp3';
import './Game.css';

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const Game = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [selectedLabelIndex, setSelectedLabelIndex] = useState(0);
  const [labels, setLabels] = useState([
    { id: 1, name: 'Femur', side: 'left' },
    { id: 2, name: 'Tibia', side: 'left' },
    { id: 3, name: 'Pectoral', side: 'right' },
    { id: 4, name: 'Cráneo', side: 'left' },
    { id: 5, name: 'Esternón', side: 'right' },
    { id: 6, name: 'Húmero', side: 'left' },
    { id: 7, name: 'Deltoides', side: 'right' },
    { id: 8, name: 'Bíceps', side: 'left' },
    { id: 9, name: 'Cuadriceps', side: 'right' },
    { id: 10, name: 'Trapecio', side: 'left' },
  ]);

  const [timer, setTimer] = useState(360);
  const [paused, setPaused] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [currentPointIndex, setCurrentPointIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  
  const audioRef = useRef(null);
  const timeoutRef = useRef(null);
  const feedbackRef = useRef(null);
  const bodyImageRef = useRef(null);
  const labelsLeftRef = useRef(null);
  const labelsRightRef = useRef(null);

  const points = [
    { id: 1, x: 21, y: 60, description: 'Este hueso es el más largo y fuerte del cuerpo humano. Se encuentra en la parte superior de tu pierna, ¡te ayuda a saltar y correr!' },
    { id: 2, x: 30, y: 80, description: 'Este hueso es el principal en la espinilla. Se localiza entre la rodilla y el tobillo.' },
    { id: 3, x: 67, y: 29, description: 'Este músculo está en tu pecho. Te ayuda a mover los brazos hacia el frente y a empujar cosas, como cuando haces flexiones. ¡Es uno de los músculos que usamos para dar abrazos fuertes!' },
    { id: 4, x: 26, y: 15, description: 'Esta parte de tu cabeza está formada por varios huesos y protege tu cerebro. Es como un casco natural' },
    { id: 5, x: 26, y: 30, description: 'Este hueso plano está en el centro de tu pecho. Protege tu corazón y tus pulmones, ¡como un escudo!' },
    { id: 6, x: 35, y: 33, description: 'Este hueso largo está en tu brazo, entre el hombro y el codo. Te ayuda a mover el brazo hacia arriba y hacia abajo.' },
    { id: 7, x: 79, y: 27, description: 'Este músculo en tu hombro tiene forma de triángulo y te ayuda a levantar el brazo hacia los lados y hacia arriba.' },
    { id: 8, x: 79, y: 35, description: 'Este músculo está en la parte delantera de tu brazo y te ayuda a doblar el codo y levantar cosas pesadas.' },
    { id: 9, x: 64, y: 58, description: 'Este grupo de músculos está en la parte frontal de tu muslo. Te ayuda a estirar la pierna y a hacer actividades divertidas como correr y saltar.' },
    { id: 10, x: 64, y: 24, description: 'Este músculo grande está en la parte superior de tu espalda. Te ayuda a mover los hombros y a mantener el cuello recto.' },
  ];

  useEffect(() => {
    if (showPopup && feedbackRef.current) {
      feedbackRef.current.focus();
    }
  }, [showPopup]);

  const playAudio = useCallback(async (type) => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      const audioFile = type === 'correct' ? correctSound : wrongSound;
      const newAudio = new Audio(audioFile);
      
      newAudio.preload = 'auto';
      await new Promise(resolve => newAudio.addEventListener('canplaythrough', resolve));
      
      const playPromise = newAudio.play();
      
      if (playPromise !== undefined) {
        await playPromise
          .then(() => {
            audioRef.current = newAudio;
          })
          .catch(error => {
            console.log('Reproducción automática bloqueada:', error);
            setFeedback('¡Haz clic en cualquier lugar para activar el sonido!');
            setShowPopup(true);
            
            const enableAudio = () => {
              newAudio.play();
              document.removeEventListener('click', enableAudio);
            };
            document.addEventListener('click', enableAudio);
          });
      }
    } catch (error) {
      console.error('Error de audio:', error);
    }
  }, []);

  const handleStart = useCallback(() => {
    setHasStarted(true);
    setLabels(prev => shuffleArray([...prev]));
  }, []);

  const handleSelectLabel = useCallback((direction) => {
    if (!gameOver && labels.length > 0) {
      setSelectedLabelIndex(prev => {
        const newIndex = direction === 'up' ? prev - 1 : prev + 1;
        return (newIndex + labels.length) % labels.length;
      });
    }
  }, [gameOver, labels.length]);

  const handleDropLabel = useCallback(async () => {
    if (gameOver || !labels[selectedLabelIndex]) return;

    const currentPoint = points[currentPointIndex];
    const selectedLabel = labels[selectedLabelIndex];
    const isCorrect = selectedLabel.id === currentPoint.id;

    setFeedback('');
    setShowPopup(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    try {
      if (isCorrect) {
        await playAudio('correct');
        setFeedback('¡Correcto! 🎉');
        setShowPopup(true);

        setLabels(prev => {
          const newLabels = prev.filter(label => label.id !== selectedLabel.id);
          setSelectedLabelIndex(prevIndex => {
            return newLabels.length > 0 ? Math.min(prevIndex, newLabels.length - 1) : 0;
          });
          return newLabels;
        });

        setCurrentPointIndex(prev => {
          const newIndex = prev + 1;
          if (newIndex >= points.length) {
            setGameOver(true);
            setFeedback('¡Juego Finalizado! 🎉');
          }
          return Math.min(newIndex, points.length - 1);
        });
      } else {
        await playAudio('incorrect');
        setFeedback('Incorrecto. Intenta de nuevo. ❌');
        setShowPopup(true);
      }
    } catch (error) {
      console.error('Error en el flujo del juego:', error);
    }

    timeoutRef.current = setTimeout(() => {
      setShowPopup(false);
      bodyImageRef.current?.focus();
    }, 3000);
  }, [currentPointIndex, gameOver, labels, playAudio, points.length, selectedLabelIndex]);

  const handlePause = useCallback(() => {
    if (!gameOver) {
      setPaused(true);
      setFeedback('Juego pausado. Presiona Continuar para seguir jugando.');
      setShowPopup(true);
    }
  }, [gameOver]);

  const handleContinue = useCallback(() => {
    setPaused(false);
    setFeedback('');
    setShowPopup(false);
  }, []);

  const handleRestart = useCallback(() => {
    window.location.reload();
  }, []);

  useEffect(() => {
    if (!paused && !gameOver) {
      const interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            setGameOver(true);
            setFeedback('El tiempo se ha terminado, Reiniciar Juego');
            setShowPopup(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [paused, gameOver]);

  const handleKeyDown = useCallback((e) => {
    if (gameOver) return;

    if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
      e.preventDefault();
    }

    switch (e.key.toLowerCase()) {
      case 'arrowup':
        handleSelectLabel('up');
        break;
      case 'arrowdown':
        handleSelectLabel('down');
        break;
      case 'enter':
        if (!hasStarted) handleStart();
        else handleDropLabel();
        break;
      case 'p':
        handlePause();
        break;
      case 'c':
        handleContinue();
        break;
      case 'r':
        handleRestart();
        break;
      default:
        break;
    }
  }, [gameOver, handleSelectLabel, handleDropLabel, handlePause, handleContinue, handleRestart, hasStarted]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [handleKeyDown]);

  return (
    <div className="game-muscle">
      {!hasStarted ? (
        <div className="overlay-screen">
          <h1 tabIndex="0">¡Bienvenido al Juego de Huesos y Músculos!</h1>
          <p tabIndex="0">Etiqueta correctamente los puntos del cuerpo humano.</p>
          <button 
            onClick={handleStart} 
            className="play-button"
            autoFocus
            aria-label="Comenzar juego"
          >
            <FaPlay /> Jugar
          </button>
        </div>
      ) : (
        <>
          <div className="header">
            <div className="timer" aria-live="polite" tabIndex="0">
              ⏱️ Tiempo: {timer}s
            </div>
            <p className="indicator" aria-live="polite"tabIndex="0">
              Selecciona la etiqueta para el punto: {currentPointIndex + 1}
            </p>
          </div>

          {showPopup && (
            <div
              ref={feedbackRef}
              className={`feedback-popup ${feedback.includes('Correcto') ? 'correct' : 'incorrect'}`}
              role="alertdialog"
              aria-labelledby="feedback-heading"
              tabIndex="-1"
            >
              <h2 id="feedback-heading">{feedback}</h2>
              {gameOver && (
                <button onClick={handleRestart} tabIndex="0">
                  Reiniciar Juego
                </button>
              )}
            </div>
          )}

          <div className="labels-left" ref={labelsLeftRef}>
            {labels.filter(label => label.side === 'left').map((label, index) => (
              <Label
                key={label.id}
                label={label}
                selected={selectedLabelIndex === labels.indexOf(label)}
                onSelect={() => setSelectedLabelIndex(labels.indexOf(label))}
                tabIndex={index === 0 ? 0 : -1}
              />
            ))}
          </div>

          <BodyImage 
            ref={bodyImageRef}
            points={points} 
            handleDropLabel={handleDropLabel}
            currentPointIndex={currentPointIndex}
          />

          <div className="labels-right" ref={labelsRightRef}>
            {labels.filter(label => label.side === 'right').map((label, index) => (
              <Label
                key={label.id}
                label={label}
                selected={selectedLabelIndex === labels.indexOf(label)}
                onSelect={() => setSelectedLabelIndex(labels.indexOf(label))}
                tabIndex={index === 0 ? 0 : -1}
              />
            ))}
          </div>

          <div className="controls">
            <button 
              onClick={handlePause} 
              disabled={gameOver}
              aria-label={paused ? 'Juego pausado' : 'Pausar juego'}
              aria-disabled={gameOver}
            >
              <FaPause />
            </button>
            <button 
              onClick={handleRestart} 
              aria-label="Reiniciar juego"
            >
              <FaRedo />
            </button>
            <button 
              onClick={handleContinue} 
              disabled={!paused || gameOver}
              aria-label="Continuar juego"
              aria-disabled={!paused || gameOver}
            >
              <FaPlay />
            </button>
          </div>

          <div 
            aria-live="polite" 
            className="sr-only"
            aria-atomic="true"
          >
            {labels[selectedLabelIndex]?.name} seleccionado
          </div>
        </>
      )}
    </div>
  );
};

export default Game;