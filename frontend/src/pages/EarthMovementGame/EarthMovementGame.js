import React, { useState, useRef } from "react";
import Header from '../../components/header';
import { FaPause, FaPlay, FaRedo, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import './EarthMovementGame.css';
const images = require.context('../../assets', false, /\.(png|jpe?g|svg)$/);


const questionsPool = [
  // ROTACIÓN DE LA TIERRA
  {
    question: "¿Qué es la rotación de la Tierra?",
    options: [
      "El movimiento de la Tierra alrededor del Sol",
      "El giro de la Tierra sobre su propio eje",
      "El cambio de estaciones",
    ],
    correctIndex: 1,
    explanation:
      "La rotación de la Tierra es el movimiento sobre su propio eje, causando el día y la noche.",
  },
  {
    question: "¿Cuánto tarda la Tierra en completar una rotación?",
    options: ["24 horas", "365 días", "1 mes"],
    correctIndex: 0,
    explanation: "La Tierra tarda aproximadamente 24 horas en completar una rotación sobre su eje.",
  },
  {
    question: "¿Qué fenómeno ocurre debido a la rotación de la Tierra?",
    options: ["Las estaciones del año", "El día y la noche", "Las mareas"],
    correctIndex: 1,
    explanation: "El día y la noche ocurren debido a la rotación de la Tierra sobre su eje.",
  },
  {
    question: "¿En qué dirección gira la Tierra en su rotación?",
    options: ["De oeste a este", "De este a oeste", "No gira"],
    correctIndex: 0,
    explanation: "La Tierra gira en dirección de oeste a este, lo que hace que el Sol parezca moverse de este a oeste.",
  },
  {
    question: "¿Cómo se llama la línea imaginaria sobre la cual gira la Tierra?",
    options: ["Ecuador", "Órbita", "Eje terrestre"],
    correctIndex: 2,
    explanation: "La Tierra gira sobre su eje terrestre, una línea imaginaria que atraviesa los polos.",
  },
  {
    question: "¿Qué causa la diferencia de husos horarios en el mundo?",
    options: ["La traslación", "La rotación", "El efecto Coriolis"],
    correctIndex: 1,
    explanation: "Los husos horarios existen porque la Tierra gira sobre su eje, cambiando la posición del Sol en el cielo.",
  },

  // TRASLACIÓN DE LA TIERRA
  {
    question: "¿Cuánto tarda la Tierra en completar una traslación alrededor del Sol?",
    options: ["24 horas", "365 días", "7 días"],
    correctIndex: 1,
    explanation: "La traslación de la Tierra dura aproximadamente 365 días, formando un año.",
  },
  {
    question: "¿Cómo se llama el movimiento que la Tierra realiza alrededor del Sol?",
    options: ["Rotación", "Revolución", "Precesión"],
    correctIndex: 1,
    explanation: "El movimiento de la Tierra alrededor del Sol se llama traslación o revolución.",
  },
  {
    question: "¿Qué forma tiene la órbita de la Tierra alrededor del Sol?",
    options: ["Circular", "Elíptica", "Triangular"],
    correctIndex: 1,
    explanation: "La órbita de la Tierra es elíptica, lo que significa que hay momentos en los que está más cerca y más lejos del Sol.",
  },
  {
    question: "¿Cómo se llama el punto más cercano de la Tierra al Sol en su órbita?",
    options: ["Perihelio", "Afelio", "Solsticio"],
    correctIndex: 0,
    explanation: "El perihelio es el punto donde la Tierra está más cerca del Sol en su órbita.",
  },
  {
    question: "¿Cómo se llama el punto más alejado de la Tierra al Sol en su órbita?",
    options: ["Perihelio", "Afelio", "Equinoccio"],
    correctIndex: 1,
    explanation: "El afelio es el punto donde la Tierra está más alejada del Sol en su órbita.",
  },

  // INCLINACIÓN DEL EJE TERRESTRE Y ESTACIONES
  {
    question: "¿Por qué la Tierra tiene estaciones del año?",
    options: ["Por su órbita elíptica", "Por la inclinación del eje terrestre", "Por la Luna"],
    correctIndex: 1,
    explanation: "La inclinación del eje terrestre hace que distintas partes del planeta reciban más o menos luz solar en diferentes épocas del año.",
  },
  {
    question: "¿Cuánto está inclinado el eje terrestre?",
    options: ["90°", "45°", "23.5°"],
    correctIndex: 2,
    explanation: "El eje de la Tierra está inclinado aproximadamente 23.5° respecto a su órbita.",
  },
  {
    question: "¿Cuándo ocurre el solsticio de verano en el hemisferio norte?",
    options: ["21 de junio", "21 de diciembre", "21 de marzo"],
    correctIndex: 0,
    explanation: "El solsticio de verano en el hemisferio norte ocurre el 21 de junio.",
  },
  {
    question: "¿Cuándo ocurre el solsticio de invierno en el hemisferio norte?",
    options: ["21 de junio", "21 de diciembre", "21 de marzo"],
    correctIndex: 1,
    explanation: "El solsticio de invierno en el hemisferio norte ocurre el 21 de diciembre.",
  },

  // EFECTO CORIOLIS
  {
    question: "¿Qué es el efecto Coriolis?",
    options: [
      "El cambio en la velocidad de rotación de la Tierra",
      "La desviación de los vientos y corrientes debido a la rotación de la Tierra",
      "El movimiento de las placas tectónicas",
    ],
    correctIndex: 1,
    explanation: "El efecto Coriolis es la desviación de los vientos y corrientes debido a la rotación terrestre.",
  },
  {
    question: "¿Hacia qué dirección giran los ciclones en el hemisferio norte debido al efecto Coriolis?",
    options: ["Sentido horario", "Sentido antihorario", "No giran"],
    correctIndex: 1,
    explanation: "Debido al efecto Coriolis, los ciclones giran en sentido antihorario en el hemisferio norte.",
  },

  // MÁS PREGUNTAS (MAREAS, DÍA SOLAR, DÍA SIDERAL, ETC.)
  {
    question: "¿Qué fenómeno ocurre por la atracción gravitatoria del Sol y la Luna sobre la Tierra?",
    options: ["Efecto Coriolis", "Mareas", "Auroras boreales"],
    correctIndex: 1,
    explanation: "Las mareas son causadas por la atracción gravitatoria de la Luna y el Sol sobre los océanos de la Tierra.",
  },
  {
    question: "¿Qué es un día solar?",
    options: [
      "El tiempo que tarda la Tierra en rotar 360° respecto a una estrella lejana",
      "El tiempo entre dos pasos consecutivos del Sol por el mismo meridiano",
      "El tiempo entre dos equinoccios",
    ],
    correctIndex: 1,
    explanation: "Un día solar es el tiempo entre dos pasos consecutivos del Sol por el mismo meridiano (aproximadamente 24 horas).",
  },
];


// Seleccionar aleatoriamente 6 preguntas de las 100
const getRandomQuestions = () => {
  return [...questionsPool].sort(() => Math.random() - 0.5).slice(0, 6);
};
function EarthMovementGame() {
  const [flippedCards, setFlippedCards] = useState(Array(6).fill(false));
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const feedbackRef = useRef(null);
  const [cardResults, setCardResults] = useState(Array(6).fill(null)); // Estado para marcar ✅ o ❌ en cada carta
  const [showFeedback, setShowFeedback] = useState(Array(6).fill(false));
  const [feedbackType, setFeedbackType] = useState(Array(6).fill(null)); 
  const [questions, setQuestions] = useState(getRandomQuestions());
  const [selectedAnswers, setSelectedAnswers] = useState(Array(6).fill(null));

  const resetGame = () => {
    setQuestions(getRandomQuestions()); // Seleccionar nuevas preguntas aleatorias
    setFlippedCards(Array(6).fill(false)); // Reiniciar las cartas giradas
    setSelectedCardIndex(null); // Reiniciar el índice de la carta seleccionada
    setSelectedAnswers(Array(6).fill(null)); // Reiniciar las respuestas seleccionadas
    setFeedbackMessage(""); // Limpiar el mensaje de retroalimentación
    setCardResults(Array(6).fill(null)); // Limpiar los resultados de las cartas
    setShowFeedback(Array(6).fill(false)); // Limpiar el estado de retroalimentación
    setFeedbackType(Array(6).fill(null)); // Limpiar los colores de retroalimentación
  };
  
  

  const handleCardClick = (index) => {
    if (!flippedCards[index]) {
      const updatedFlippedCards = flippedCards.map((_, i) => i === index);
      setFlippedCards(updatedFlippedCards);
      setSelectedCardIndex(index);
      setSelectedAnswers([...selectedAnswers]); // Usar el estado correcto
      setFeedbackMessage("");
    }
  };

  const handleAnswer = (cardIndex, answerIndex) => {
    if (selectedAnswers[cardIndex] === null) { // Verifica que no se haya seleccionado una respuesta para esta carta
      let updatedResults = [...cardResults];
      let updatedAnswers = [...selectedAnswers];
      let updatedFeedback = [...showFeedback];
      let updatedFeedbackType = [...feedbackType];
  
      // Validar si la respuesta es correcta o incorrecta
      if (answerIndex === questions[cardIndex % questions.length].correctIndex) {
        updatedResults[cardIndex] = "✅"; // Respuesta correcta
        updatedFeedbackType[cardIndex] = "success"; // Color verde
        setFeedbackMessage("¡Muy bien hecho! ✅"); // Mensaje positivo
      } else {
        updatedResults[cardIndex] = "❌"; // Respuesta incorrecta
        updatedFeedbackType[cardIndex] = "error"; // Color rojo
        setFeedbackMessage(
          `❌ Respuesta incorrecta:\n\nLa respuesta correcta es: "${questions[cardIndex % questions.length].options[questions[cardIndex % questions.length].correctIndex]}".\n${questions[cardIndex % questions.length].explanation}`
        ); // Mensaje negativo
      }
  
      // Actualizar los estados individuales de cada carta
      updatedAnswers[cardIndex] = answerIndex; // Guardar la respuesta seleccionada
      updatedFeedback[cardIndex] = true; // Mostrar retroalimentación para la carta actual
  
      // Actualizar los estados globales
      setCardResults(updatedResults);
      setSelectedAnswers(updatedAnswers);
      setShowFeedback(updatedFeedback);
      setFeedbackType(updatedFeedbackType);
      setTimeout(() => {
        if (feedbackRef.current) feedbackRef.current.focus();
      }, 100);
    }
};


  return (
    <div>
      <Header />
      <main>
        <div className="game-container">
          <div className="game-area">
            <h1 tabIndex={0}>Juego: Movimientos de la Tierra</h1>
            <div className="card-grid">
  {flippedCards.map((flipped, index) => (
    <div key={index} className={`card-container ${flipped ? "flipped" : ""}`}>
      <div className="card">
        <button
          className="front"
          onClick={() => handleCardClick(index)}
          tabIndex={index + 1}
          disabled={flipped}
          aria-label={`Carta ${index + 1}`}
        >
          {cardResults[index] ? (
            <span className="emoji-large">{cardResults[index]}</span>
          ) : (
            <span className="card-number">{index + 1}</span>
          )}
        </button>
        <div className="back">
          <div className="question-box" tabIndex={10}>
            <h2>{questions[index % questions.length].question}</h2>
            <div className="answers">
              {questions[index % questions.length].options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(index, i)} // Actualizamos para manejar el estado por carta
                  className={`answer-button ${
                    selectedAnswers[index] !== null
                      ? i === questions[index % questions.length].correctIndex
                        ? "correct"
                        : i === selectedAnswers[index]
                        ? "incorrect"
                        : "disabled"
                      : ""
                  }`}
                  tabIndex={11 + i}
                  disabled={selectedAnswers[index] !== null} // Bloqueamos después de elegir una respuesta
                  aria-label={option}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mensaje de Retroalimentación sobre la carta */}
      {showFeedback[index] && (
  <div className={`feedback-overlay ${feedbackType[index] === "success" ? "success" : "error"}`}>
    {feedbackMessage}
  </div>
)}
    </div>
  ))}
</div>

</div>

          <div className="controls">
            <button onClick={resetGame} aria-label="Reiniciar">
              <FaRedo />
            </button>
          </div>
        
          {/* Instrucciones al lado del juego */}







    <div className="instructions" tabIndex="0" aria-label="Instrucciones del juego">
    <h2>Instrucciones</h2>
    <ul>
        <li className="small-spacing with-bullet">Usa las teclas de flecha <FaArrowUp /> <FaArrowDown /> para moverte entre las tarjetas.</li>
        <li className="small-spacing with-bullet">Presiona Enter o Espacio para seleccionar una tarjeta.</li>
        <li className="small-spacing with-bullet">Presiona "P" <FaPause /> para pausar y "C" <FaPlay /> para continuar.</li>
        <li className="small-spacing with-bullet">Presiona "R" <FaRedo /> para reiniciar el juego.</li>
        <li className="small-spacing with-bullet">Navega con la tecla <strong>Tab</strong> para interactuar.</li>
    </ul>
</div>

        </div>
        





        <div className="related-content">
                    <h2>Más contenido relacionado</h2>
                    <div className="related-items">
                    <div className="related-item">
                        <a
                            href="https://www.youtube.com/watch?v=6Ey_qqjjv5s"
                            target="_blank"
                            rel="noopener noreferrer"
                            tabIndex="0"
                            aria-label="Enlace a video sobre la traslación y rotación de la Tierra"
                        >
                            <img
                                src={images('./earth1.png')}
                                alt="Video sobre la traslación y rotación de la Tierra"
                                tabIndex="-1" // Evita que la imagen sea enfocable
                            />
                        </a>
                    </div>
                    <div className="related-item">
                        <a
                            href="https://www.youtube.com/watch?v=RRLMBbt778A"
                            target="_blank"
                            rel="noopener noreferrer"
                            tabIndex="0"
                            aria-label="Enlace a video sobre las estaciones del año"
                        >
                            <img
                                src={images('./earth2.png')}
                                alt="Video sobre las estaciones del año"
                                tabIndex="-1" // Evita que la imagen sea enfocable
                            />
                        </a>
                    </div>
                    <div className="related-item">
                        <a
                            href="https://www.youtube.com/watch?v=ecsTOP8A1BU"
                            target="_blank"
                            rel="noopener noreferrer"
                            tabIndex="0"
                            aria-label="Enlace a video sobre el día y la noche"
                        >
                            <img
                                src={images('./earth3.png')}
                                alt="Video sobre el día y la noche"
                                tabIndex="-1" // Evita que la imagen sea enfocable
                            />
                        </a>
                    </div>
                    <div className="related-item">
                        <a
                            href="https://www.youtube.com/watch?v=ZykXgSqet6A"
                            target="_blank"
                            rel="noopener noreferrer"
                            tabIndex="0"
                            aria-label="Enlace a video sobre el Sistema Solar"
                        >
                            <img
                                src={images('./earth4.png')}
                                alt="Video explicativo sobre el Sistema Solar"
                                tabIndex="-1" // Evita que la imagen sea enfocable
                            />
                        </a>
                    </div>
                    </div>
                </div>
            </main>
    </div>
  );
}

export default EarthMovementGame;
