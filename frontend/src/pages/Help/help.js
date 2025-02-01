import React, { useState, useEffect } from "react";
import Header from "../../components/header";

function Help() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  // Cargar preguntas desde localStorage al iniciar
  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem("questions")) || [];
    setQuestions(storedQuestions);
  }, []);

  // Guardar preguntas en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions));
  }, [questions]);

  // Manejar el envío de una nueva pregunta
  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      const updatedQuestions = [
        ...questions,
        { question: newQuestion, answer: null, isNew: true },
      ];
      setQuestions(updatedQuestions);
      setNewQuestion("");
      setShowMessage(true); // Mostrar mensaje

      // Ocultar mensaje después de 3 segundos
      setTimeout(() => {
        setShowMessage(false);
        document.getElementById("question-input").focus(); // Regresar el foco al input
      }, 3000);
    }
  };

  return (
    <div>
      <Header />
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1 tabIndex={1}>Centro de Ayuda</h1>

        {/* Formulario para agregar nueva pregunta */}
        <h2 tabIndex={2}>Haz tu pregunta</h2>
        <div style={{ marginBottom: "20px" }}>
          <input
            id="question-input"
            type="text"
            placeholder="Escribe tu pregunta aquí..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            tabIndex={3}
            aria-label="Campo para escribir tu pregunta"
          />
          <button
            onClick={handleAddQuestion}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            tabIndex={4}
            aria-label="Botón para enviar tu pregunta"
          >
            Enviar Pregunta
          </button>
        </div>

        {/* Mensaje de confirmación */}
        {showMessage && (
          <div
            style={{
              marginBottom: "20px",
              padding: "10px",
              backgroundColor: "#e8f5e9",
              color: "#4caf50",
              borderRadius: "5px",
              textAlign: "center",
            }}
            tabIndex={5}
            aria-live="polite"
          >
            Su pregunta será respondida por un administrador lo más rápido posible.
          </div>
        )}

        {/* Lista de preguntas */}
        <h2 tabIndex={6}>Preguntas Realizadas</h2>
        <div>
          {questions.map((q, index) => (
            <div
              key={index}
              style={{
                marginBottom: "10px",
                backgroundColor: "#f0f0f0",
                borderRadius: "5px",
                padding: "10px",
                border: q.isNew ? "2px solid red" : "1px solid #ccc",
              }}
              tabIndex={7 + index}
            >
              <strong>{q.question}</strong>
              {q.answer ? (
                <p style={{ marginTop: "10px", color: "#333" }}>{q.answer}</p>
              ) : (
                <p style={{ marginTop: "10px", color: "gray" }}>
                  Respuesta pendiente
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Help;
