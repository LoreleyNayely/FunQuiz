import React, { useState, useEffect } from 'react';
import clockIcon from '../../../assets/clock-icon.png'; // Ajusta la ruta a tu imagen
import './timer.css'; // Asegúrate de que la ruta sea correcta

const Timer = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="timer">
      <img src={clockIcon} alt="Clock Icon" className="clock-icon" /> 
      <span className="time-text">{time}s</span>
    </div>
  );
};

export default Timer;