import React, { useState, useEffect } from 'react'; 
import Label from './Label';
import BodyImage from './BodyImage';
import { FaPause, FaPlay, FaRedo} from 'react-icons/fa';
import correctSound from './../../../assets/sounds/correcto.mp3';
import wrongSound from './../../../assets/sounds/incorrecto.mp3'
import './Game.css';

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

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

  const points = [
	{ id: 1, x: 21, y: 60, description: 'Este hueso es el más largo y fuerte del cuerpo humano. Se encuentra en la parte superior de tu pierna, ¡te ayuda a saltar y correr!' },
    { id: 2, x: 30, y: 80, description: 'Este hueso es el principal en la espinilla. Se localiza entre la rodilla y el tobillo.' },
    { id: 3, x: 67, y: 29, description: 'Este músculo está en tu pecho. Te ayuda a mover los brazos hacia el frente y a empujar cosas, como cuando haces flexiones. ¡Es uno de los músculos que usamos para dar abrazos fuertes!'  },
    { id: 4, x: 26, y: 15, description: 'Esta parte de tu cabeza está formada por varios huesos y protege tu cerebro. Es como un casco natural'  },
    { id: 5, x: 26, y: 30, description:'Este hueso plano está en el centro de tu pecho. Protege tu corazón y tus pulmones, ¡como un escudo!' },
    { id: 6, x: 35, y: 33, description: 'Este hueso largo está en tu brazo, entre el hombro y el codo. Te ayuda a mover el brazo hacia arriba y hacia abajo.'  },
    { id: 7, x: 79, y: 27, description: 'Este músculo en tu hombro tiene forma de triángulo y te ayuda a levantar el brazo hacia los lados y hacia arriba.'  },
    { id: 8, x: 79, y: 35 , description: 'Este músculo está en la parte delantera de tu brazo y te ayuda a doblar el codo y levantar cosas pesadas.' },
    { id: 9, x: 64, y: 58 , description: 'Este grupo de músculos está en la parte frontal de tu muslo. Te ayuda a estirar la pierna y a hacer actividades divertidas como correr y saltar.' },
    { id: 10, x: 64, y: 24 , description: 'Este músculo grande está en la parte superior de tu espalda. Te ayuda a mover los hombros y a mantener el cuello recto.' },
  ];

  const handleStart = () => {
    setHasStarted(true);
    setLabels(shuffleArray(labels)); 
  };

  const handleSelectLabel = (direction) => {
	if (!gameOver) {
    setSelectedLabelIndex((prev) => (direction === 'up'
      ? (prev - 1 + labels.length) % labels.length
      : (prev + 1) % labels.length));
	}
  };

  const handleDropLabel = () => {
	if (gameOver) return; // No permitir acciones si el juego ha terminado
    
	const currentPoint = points[currentPointIndex];
    const selectedLabel = labels[selectedLabelIndex];

    if (selectedLabel?.id === currentPoint.id) {
      new Audio(correctSound).play();
      setFeedback('¡Correcto! 🎉');
      setShowPopup(true); 
      setLabels((prev) => prev.filter((label) => label.id !== selectedLabel.id));
      
	  if (currentPointIndex + 1 === points.length) {
        setGameOver(true);
		setFeedback('¡Juego Finalizado! 🎉');
		setShowPopup(true);  // Mostrar popup de "Juego Finalizado"
        
      } else {
        setCurrentPointIndex((prev) => prev + 1);  // Solo aumenta si es correcto
      }
    } else {
      new Audio(wrongSound).play();
      setFeedback('Incorrecto. Intenta de nuevo. ❌');
	  setShowPopup(true);
    }

    setTimeout(() => {
		setFeedback('');
		setShowPopup(false);  // Ocultar el popup después de unos segundos
	}, 5000);
  };

  const handlePause = () => {
	if (!gameOver) {
		setPaused(true);
    	setFeedback('Juego pausado. Presiona Continuar para seguir jugando.');
	}
  };

  const handleContinue = () => {
    setPaused(false);
    setFeedback('');
  };

  const handleRestart = () => {
    window.location.reload();
  };

  useEffect(() => {
	if (!paused && !gameOver) {
		const interval = setInterval(() => {
		  setTimer((prev) => {
			if (prev === 1) {
			  setGameOver(true);
			  setFeedback('El tiempo se ha terminado, Reiniciar Juego');
			  setShowPopup(true);
			}
			return prev > 0 ? prev - 1 : 0;
		  });
		}, 1000);
		return () => clearInterval(interval);
	  }
	}, [paused, gameOver]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;
  
      switch (e.key) {
        case 'ArrowUp':
          handleSelectLabel('up');
          break;
        case 'ArrowDown':
          handleSelectLabel('down');
          break;
        case 'Enter':
          if (!hasStarted) {
            handleStart();
          } else {
            handleDropLabel();
          }
          break;
        case 'p':
        case 'P':
          setPaused(true);
          setFeedback('Juego pausado. Presiona Continuar para seguir jugando.');
          setShowPopup(true);
          break;
        case 'c':
        case 'C':
          setPaused(false);
          setFeedback('Continua Jugando! 🎮😊');
          setShowPopup(true);
          break;
        case 'r':
        case 'R':
          window.location.reload();
          break;
        default:
          break;
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDropLabel, handleSelectLabel, handleStart, hasStarted, selectedLabelIndex, currentPointIndex, paused, labels, gameOver]);
    

  return (
    <div className="game">
        {!hasStarted ? (
			<div className="overlay-screen"> {}
			  <h1 tabIndex="0">¡Bienvenido al Juego de Huesos y Músculos!</h1>
			  <p tabIndex="0">Etiqueta correctamente los puntos del cuerpo humano.</p>
			  <p tabIndex="0">Presiona <FaPlay /> para comenzar.</p>
			  <button onClick={handleStart} className="play-button" tabIndex="0">
				<FaPlay /> Jugar
			  </button>
			</div>
      ) : (
        <>
           <div className="header">
            <div className="timer" tabIndex="0">⏱️ Tiempo: {timer}s</div>
			<p className="indicator"tabIndex="0">Selecciona la etiqueta para el punto: {currentPointIndex + 1}</p>
          </div>
          {showPopup && <div className="feedback-popup" tabIndex="0">{feedback} </div>} {}
		  <div
    aria-live="assertive"
    role="alert"
    style={{
      position: 'absolute',
      left: '-9999px', 
    }}
  >
    {labels[selectedLabelIndex]?.name}
  </div>
          <div className="labels-left">
            {labels
              .filter((label) => label.side === 'left')
              .map((label, index) => (
                <Label
                  key={label.id}
                  label={label}
                  selected={selectedLabelIndex === labels.indexOf(label)}
                  onSelect={() => setSelectedLabelIndex(labels.indexOf(label))}
				  tabIndex="0"
                />
              ))}
          </div>
          <BodyImage points={points} handleDropLabel={handleDropLabel} />
          <div className="labels-right">
            {labels
              .filter((label) => label.side === 'right')
              .map((label, index) => (
                <Label
                  key={label.id}
                  label={label}
                  selected={selectedLabelIndex === labels.indexOf(label)}
                  onSelect={() => setSelectedLabelIndex(labels.indexOf(label))}
				  tabIndex="0"
                />
              ))}
          </div>
		  
	<div className="controls">
            <button onClick={handlePause} disabled={gameOver}aria-label="Pausar juego"
              tabIndex="0"><FaPause /></button>
            <button onClick={handleRestart}aria-label="Reiniciar juego"
              tabIndex="0"><FaRedo /></button>
            <button onClick={handleContinue} disabled={!paused || gameOver}aria-label="Continuar juego"
              tabIndex="0"><FaPlay /></button>
          </div>
        </>
      )}
    </div>
  );
};

export default Game;