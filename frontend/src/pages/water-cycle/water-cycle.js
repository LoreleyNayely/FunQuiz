import React, { useState, useEffect } from "react";


const correctMatches = {
    "evaporacion-part": "evaporacion",
    "condensacion-part": "condensacion",
    "precipitacion-part": "precipitacion",
    "acumulacion-part": "acumulacion",
  };

  const keyMappings = {
    "1": "evaporacion-part",
    "2": "condensacion-part",
    "3": "precipitacion-part",
    "4": "acumulacion-part",
    e: "evaporacion",
    c: "condensacion",
    p: "precipitacion",
    a: "acumulacion",
  };
const WaterCycleGame = () => {
  const [selectedPart, setSelectedPart] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [inSelectionMode, setInSelectionMode] = useState(false);

  

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (keyMappings[event.key]) {
        document.getElementById(keyMappings[event.key]).focus();
        speak(
          `Seleccionaste la parte: ${document
            .getElementById(keyMappings[event.key])
            .getAttribute("aria-label")}`
        );
      }

      if (event.key === "Tab") {
        event.preventDefault();
        const focusableElements = inSelectionMode
          ? document.querySelectorAll(".stage")
          : document.querySelectorAll(".image-part");
        let currentIndex = Array.from(focusableElements).indexOf(
          document.activeElement
        );
        let nextIndex = (currentIndex + 1) % focusableElements.length;
        focusableElements[nextIndex].focus();
      }

      if ((event.key === " " || event.key === "Enter") && !inSelectionMode) {
        setInSelectionMode(true);
        document.querySelectorAll(".stage")[0].focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [inSelectionMode]);

  const speak = (message) => {
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = "es-ES";
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
  };

  const checkAnswer = (selectedStage) => {
    if (selectedPart && correctMatches[selectedPart] === selectedStage) {
      setCorrectAnswers((prev) => ({ ...prev, [selectedStage]: true }));
      speak("¡Correcto! Has conectado la parte correctamente.");
      setSelectedPart(null);
      setInSelectionMode(false);
    } else {
      speak("Intenta de nuevo. Usa la tecla Tab para volver a elegir.");
    }
  };

  useEffect(() => {
    if (
      Object.keys(correctAnswers).length ===
      Object.keys(correctMatches).length
    ) {
      speak(
        "¡Felicidades! Has conectado todas las partes correctamente. Presiona Enter para volver a intentar."
      );
      const handleRestart = (event) => {
        if (event.key === "Enter") {
          window.location.reload();
        }
      };
      document.addEventListener("keydown", handleRestart);

      return () => {
        document.removeEventListener("keydown", handleRestart);
      };
    }
  }, [correctAnswers]);

  return (
    <div>
      <h1>Ciclo del Agua - Juego Interactivo</h1>
      <main className="container">
        <section id="image-container">
          <img
            id="image"
            src="ciclo.png"
            alt="Diagrama del ciclo del agua mostrando la evaporación, condensación, precipitación y acumulación."
          />
          {Object.keys(correctMatches).map((id, index) => (
            <button
              key={id}
              className="image-part"
              id={id}
              style={{ top: `${index * 100}px`, left: "60px" }}
              tabIndex="0"
              aria-label={`Parte ${index + 1}`}
              onFocus={() => speak(`Parte ${index + 1}`)}
              onClick={() => setSelectedPart(id)}
            >
              Parte {index + 1}
            </button>
          ))}
        </section>

        <section className="stages">
          {Object.values(correctMatches).map((stage) => (
            <button
              key={stage}
              className="stage"
              id={stage}
              tabIndex="0"
              aria-label={`Opción ${stage}`}
              onFocus={() => speak(`Opción ${stage}`)}
              onClick={() => checkAnswer(stage)}
            >
              {stage.charAt(0).toUpperCase() + stage.slice(1)}
            </button>
          ))}
        </section>
      </main>
    </div>
  );
};

export default WaterCycleGame;
