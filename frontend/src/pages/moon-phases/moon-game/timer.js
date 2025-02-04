import React, { useState, useEffect } from 'react';
import clockIcon from '../../../assets/clock-icon.png'; // Ajusta la ruta a tu imagen
import './timer.css'; // Asegúrate de que la ruta sea correcta

const Timer = ({ reset }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (reset) {
      setTime(0); // Reinicia el temporizador
    }
  }, [reset]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, []); // Este efecto solo se ejecuta una vez para iniciar el temporizador

  return (
    <div
  className="timer"
  tabIndex="0"
  aria-label={`Tiempo transcurrido: ${time} segundos`}
  aria-live="off" // Permite la actualización dinámica para ser leído
>
  <div className="timer-content">
    <img
      src={clockIcon}
      className="clock-icon"
      alt="Ícono de reloj"
    />
    <span className="time-text">
      {time}s
    </span>
  </div>
  <p className="objective-text"  tabIndex="0">Objetivo: Luna Creciente</p>
</div>


  );
};

export default Timer;
