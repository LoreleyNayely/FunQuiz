import React from 'react';
import Header from '../../components/header';
import Game from './game-muscles-bones/Game'; 
import { FaPause, FaPlay, FaRedo, FaArrowUp,FaArrowDown} from 'react-icons/fa';

const images = require.context('../../assets', false, /\.(png|jpe?g|svg)$/);

const MusclesBones = () => {
  return (
    <div>
      <Header />
      <main>
        {/* Contenedor del juego */}
        <div className="game-container">
          <div className="game">
            <div className="muscles-bones-page">
              <Game />
            </div>
          </div>

          {/* Instrucciones del juego */}
		  <div className="instructions">
				<h2 tabIndex="0">Instrucciones del Juego </h2>
				<p tabIndex="0">Usa las teclas de flecha <FaArrowUp /> <FaArrowDown /> para moverte entre las etiquetas.</p>
				<p tabIndex="0">Presiona Enter para seleccionar una etiqueta y ubicarla en el punto correcto.</p>
				<p tabIndex="0">Presiona "P" <FaPause /> para pausar y "C" <FaPlay /> para continuar.</p>
				<p tabIndex="0">Presiona "R" <FaRedo /> para reiniciar el juego.</p>
				<p tabIndex="0">Si necesitas ayuda, puedes encontrar pistas navegando con la tecla <strong>Tab</strong>.</p>
			  </div>
        </div>

		<div className="related-content">
                    <h2>Más contenido relacionado</h2>
                    <div className="related-items">
                        <div className="related-item">
                            <a href="https://www.youtube.com/watch?v=qBNb8FwOlzQ">
                                <img src={images('./huesos1.jpg')} alt="Relacionado 1" />
                            </a>
                        </div>
                        <div className="related-item">
                            <a href="https://www.youtube.com/watch?v=fyvqwjbNB1o">
                                <img src={images('./huesos2.jpg')} alt="Relacionado 2" />
                            </a>
                        </div>
                        <div className="related-item">
                            <a href="https://www.youtube.com/watch?v=5cA161a0Elc">
                                <img src={images('./musculos1.jpg')} alt="Relacionado 3" />
                            </a>
                        </div>
                        <div className="related-item">
                            <a href="https://www.youtube.com/watch?v=gmc6QIanvD0">
                                <img src={images('./musculos2.jpg')} alt="Relacionado 4" />
                            </a>
                        </div>
                    </div>
                </div>

      </main>
    </div>
  );
};

export default MusclesBones;
