import React, { useState, useRef } from "react";
import Header from '../../components/header';
import { FaPause, FaPlay, FaRedo, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import './EarthMovementGame.css';

const questions = [
  {
    question: "¿Qué es la rotación de la Tierra?",
    options: [
      "El movimiento de la Tierra alrededor del Sol",
      "El giro de la Tierra sobre su propio eje",
      "El cambio de estaciones",
    ],
    correctIndex: 1,
    explanation: "La rotación de la Tierra es el movimiento sobre su propio eje, causando el día y la noche.",
  },
  {
    question: "¿Cuánto tiempo tarda la Tierra en dar una vuelta completa alrededor del Sol?",
    options: ["24 horas", "365 días", "7 días"],
    correctIndex: 1,
    explanation: "La traslación de la Tierra dura aproximadamente 365 días, formando un año.",
  },
  {
    question: "¿Qué efecto causa la inclinación del eje terrestre?",
    options: [
      "Las estaciones del año",
      "Las mareas",
      "El movimiento de los continentes",
    ],
    correctIndex: 0,
    explanation: "La inclinación del eje terrestre es la causa de las estaciones del año.",
  },
];

function EarthMovementGame() {
  const [flippedCards, setFlippedCards] = useState(Array(6).fill(false));
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [markedCards, setMarkedCards] = useState(Array(6).fill(null));
  const [answeredCards, setAnsweredCards] = useState(Array(6).fill(false));
  const answerRef = useRef(null);
  const feedbackRef = useRef(null);

  const handleCardClick = (index) => {
    if (!answeredCards[index]) {
      setFlippedCards((prev) => prev.map((_, i) => i === index));
      setSelectedCardIndex(index % questions.length);
      setSelectedAnswer(null);
      setFeedbackMessage("");
    }
  };

  const handleKeyDown = (event, index) => {
    if ((event.key === "Enter" || event.key === " ") && !answeredCards[index]) {
      handleCardClick(index);
    }
  };

  const handleAnswer = (index) => {
    if (selectedCardIndex !== null && selectedAnswer === null) {
      let updatedAnsweredCards = [...answeredCards];
      updatedAnsweredCards[selectedCardIndex] = true;
      setAnsweredCards(updatedAnsweredCards);
      
      if (index === questions[selectedCardIndex].correctIndex) {
        setSelectedAnswer("correct");
        setFeedbackMessage("¡Respuesta correcta! Bien hecho. ✅");
        setMarkedCards((prev) => prev.map((_, i) => (i === selectedCardIndex ? "✅" : prev[i])));
      } else {
        setSelectedAnswer("incorrect");
        setFeedbackMessage(
          `❌ Respuesta incorrecta. La respuesta correcta es: "${questions[selectedCardIndex].options[questions[selectedCardIndex].correctIndex]}". ${questions[selectedCardIndex].explanation}`
        );
        setMarkedCards((prev) => prev.map((_, i) => (i === selectedCardIndex ? "❌" : prev[i])));
      }
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
                <button
                  key={index}
                  className={`card ${flipped ? "flipped" : ""}`}
                  onClick={() => handleCardClick(index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  tabIndex={index + 1}
                  disabled={answeredCards[index]}
                  aria-label={flipped ? "Carta seleccionada" : "Carta boca abajo"}
                >
                  {flipped ? markedCards[index] || "❓" : "🌍"}
                </button>
              ))}
            </div>
            <div className="question-container">
              {selectedCardIndex !== null && (
                <div className="question-box" tabIndex={10}>
                  <h2>{questions[selectedCardIndex].question}</h2>
                  <div className="answers">
                    {questions[selectedCardIndex].options.map((option, i) => (
                      <button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        className={`answer-button ${
                          selectedAnswer !== null
                            ? i === questions[selectedCardIndex].correctIndex
                              ? "correct"
                              : i === selectedAnswer
                              ? "incorrect"
                              : "disabled"
                            : ""
                        }`}
                        tabIndex={11 + i}
                        disabled={selectedAnswer !== null}
                        aria-label={option}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  {selectedAnswer !== null && (
                    <p className="feedback" ref={feedbackRef} tabIndex={20}>
                      {feedbackMessage}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Instrucciones al lado del juego */}
          <div className="instructions">
            <h2 tabIndex="0">Instrucciones del Juego</h2>
            <p tabIndex="0">
              Usa las teclas de flecha <FaArrowUp /> <FaArrowDown /> para moverte entre las tarjetas.
            </p>
            <p tabIndex="0">Presiona Enter o Espacio para seleccionar una tarjeta.</p>
            <p tabIndex="0">Presiona "P" <FaPause /> para pausar y "C" <FaPlay /> para continuar.</p>
            <p tabIndex="0">Presiona "R" <FaRedo /> para reiniciar el juego.</p>
            <p tabIndex="0">Navega con la tecla <strong>Tab</strong> para interactuar.</p>
          </div>
        </div>

        <div className="related-content">
                    <h2>Más contenido relacionado</h2>

                    <div className="related-items">
                        <div className="related-item">
                            <a
                               
                            >
                                <img
                                    
                                />
                            </a>
                        </div>
                        <div className="related-item">
                            <a
                           
                            >
                                <img
                                 
                                />
                            </a>
                        </div>
                        <div className="related-item">
                            <a
                                
                            >
                                <img
                                  
                                />
                            </a>
                        </div>
                        <div className="related-item">
                            <a
                                
                            >
                                <img
                                   
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
