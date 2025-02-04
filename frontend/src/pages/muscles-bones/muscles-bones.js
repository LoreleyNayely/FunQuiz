import React from 'react';
import Header from '../../components/header';
import Game from './game-muscles-bones/Game'; 
import { FaPause, FaPlay, FaRedo, FaArrowUp,FaArrowDown} from 'react-icons/fa';
import './muscles-bones.css';

const images = require.context('../../assets', false, /\.(png|jpe?g|svg)$/);

const MusclesBones = () => {
  return (
    <div>
      <Header />
      <main>
        {/* Contenedor del juego */}
        <div className="game-container">
          <div className="game">
            <div className="muscles-bones-page" tabIndex="0" aria-label="Espacio de juego">
              <Game />
            </div>
          </div>

          {/* Instrucciones del juego */}

    <div className="instructions" tabIndex="0" aria-label="Instrucciones del juego">
        <h2 className="Titulo" tabIndex="0">🌟Instrucciones🌟</h2>
        <p className="small-spacing" tabIndex="0">¡Vamos a jugar! Sigue estos pasos:</p>
        <p className="small-spacing with-bullet" tabIndex="0">Usa las teclas 👆 (arriba) y 👇 (abajo) para moverte entre las etiquetas.</p>
        <p className="small-spacing with-bullet" tabIndex="0">Presiona Enter (↵) para elegir la etiqueta y colocarla en su lugar correcto. ¡Así de fácil! 🎯.</p>
        <p className="small-spacing with-bullet" tabIndex="0">Si necesitas un descanso, presiona "P" para pausar.</p>
        <p className="small-spacing with-bullet" tabIndex="0">¡Presiona "C" para seguir jugando donde lo dejaste! ▶️.</p>
        <p className="small-spacing with-bullet" tabIndex="0">¿Quieres empezar de nuevo? ¡Presiona "R" y vuelve al inicio! 🔄</p>
        <p className="small-spacing with-bullet" tabIndex="0">💡 ¡Necesito ayuda!
        Presiona la tecla Tab ↹ para navegar y descubrir pistas secretas que te guiarán. 🕵️♂️</p>
    </div>
        </div>

		<div className="related-content">
                    <h2 tabIndex="0">Más contenido relacionado</h2>
                    <div className="related-items">
                        <div className="related-item">
                            <a href="https://www.youtube.com/watch?v=qBNb8FwOlzQ">
                                <img src={images('./huesos1.jpg')} alt="Video Multimedia - YouTube- Los huesos para niños | El sistema óseo | El cuerpo humano para niños - Smile and Learn Español" />
                            </a>
                        </div>
                        <div className="related-item">
                            <a href="https://www.youtube.com/watch?v=fyvqwjbNB1o">
                                <img src={images('./huesos2.jpg')} alt="Video Multimedia - YouTube - Sistema Locomotor (Videos Educativos para Niños)- Mundo divertido de niños" />
                            </a>
                        </div>
                        <div className="related-item">
                            <a href="https://www.youtube.com/watch?v=5cA161a0Elc">
                                <img src={images('./musculos1.jpg')} alt="Video Multimedia - YouTube - HUESOS, MÚSCULOS Y ARTICULACIONES - Colegio Privado Maria Medalla Milagrosa" />
                            </a>
                        </div>
                        <div className="related-item">
                            <a href="https://www.youtube.com/watch?v=gmc6QIanvD0">
                                <img src={images('./musculos2.jpg')} alt="Video Multimedia - YouTube - Los MÚSCULOS para niños | El sistema muscular | El cuerpo humano para niños - Smile and Learn- Español" />
                            </a>
                        </div>
                    </div>
                </div>

      </main>
    </div>
  );
};

export default MusclesBones;
