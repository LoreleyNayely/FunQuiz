import React, { useState } from 'react';
import './BodyImage.css';

const BodyImage = ({ points, handleDropLabel }) => {
  const [activePoint, setActivePoint] = useState(null);

  const handleKeyDown = (e, pointId) => {
    if (e.key === 'Enter') {
      handleDropLabel(pointId);
    }
  };

  return (
    <div className="body-container">
      <img src="./CuerpoHumano.png" alt="Imagen del cuerpo humano, sistema muscular y esqueleto Humano con puntos interactivos" className="body-image" tabIndex="0" />

      {/* Puntos donde las etiquetas se pueden colocar */}
      {points.map((point) => (
        <div
          key={point.id}
          className="drop-point"
          style={{ top: `${point.y}%`, left: `${point.x}%` }}
          tabIndex="0"
          onMouseEnter={() => setActivePoint(point.id)}
          onMouseLeave={() => setActivePoint(null)}
          onFocus={() => setActivePoint(point.id)}
          onBlur={() => setActivePoint(null)}
          onKeyDown={(e) => handleKeyDown(e, point.id)}
        >
          <span className="point-number">{point.id}</span>

          {/* Pop-up que muestra la descripción */}
          {activePoint === point.id && (
            <div className="popup">
              <p>{point.description}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BodyImage;
