import React, { useEffect } from 'react';
import './moon-phases.css';
import Maze from '../moon-phases/moon-game/maze';
import Header from '../../components/header';

const images = require.context('../../assets', false, /\.(png|jpe?g|svg)$/);

function Moon() {

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === ' ') {  // Verifica si la tecla presionada es el espacio
                const instructions = document.getElementById('instructions');
                if (instructions) {
                    instructions.focus();  // Hace foco en las instrucciones
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        // Limpieza al desmontar el componente
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <div>
            <Header />
            <main>
                {/* Contenedor del juego */}
                <div className="game-container">
                    <div className="game">
                        <div className="moon-phases-page" tabIndex="0">
                            <Maze />
                        </div>
                    </div>

                    {/* Instrucciones del juego */}
                    <div
                        id="instructions"
                        className="instructions"
                        tabIndex="0"
                        aria-live="assertive" // Se lee automáticamente cuando se actualiza
                        aria-label="Instrucciones"
                    >
                    <h2>Instrucciones</h2>
                    <ul tabIndex="0" aria-label="" >
                        <li className="small-spacing with-bullet" tabIndex="0" aria-label="Usa las flechitas de tu teclado:">Usa las flechitas de tu teclado:</li>
                        <li className="small-spacing" tabIndex="0" aria-label="Derecha e izquierda">➡️ (derecha) ⬅️ (izquierda)</li>
                        <li className="large-spacing" tabIndex="0" aria-label="Arriba y abajo">⬆️ (arriba) ⬇️ (abajo)</li>
                        <li className="large-spacing with-bullet" tabIndex="0" aria-label="Busca las fases de la Luna">Busca las fases de la Luna.</li>
                        <li className="small-spacing with-bullet" tabIndex="0" aria-label="Cuando encuentres una fase">Cuando encuentres una fase,</li>
                        <li className="large-spacing" tabIndex="0" aria-label="Aparecerá su nombre y brillará">¡aparecerá su nombre y brillará!</li>
                        <li className="small-spacing with-bullet" tabIndex="0" aria-label="¡Encuéntralas todas!">¡Encuéntralas todas!</li>
                        <li className="small-spacing" tabIndex="0" aria-label="¡Buena suerte!">¡Buena suerte! 🚀</li>
                    </ul>
                    </div>

                </div>

                {/* Contenido relacionado */}
                <div className="related-content">
                    <h2>Más contenido relacionado</h2>
                    <div className="related-items">
                        <div className="related-item">
                            <a
                                href="https://view.genially.com/648654c5774f910012dc8587/presentation-movimientos-y-fases-de-la-luna"
                                target="_blank"
                                rel="noopener noreferrer"
                                tabIndex="0"
                                aria-label="Enlace a presentación sobre movimientos y fases de la Luna"
                            >
                                <img
                                    src={images('./moon1.png')}
                                    alt="Presentación interactiva sobre las fases de la Luna"
                                    tabIndex="-1" // Evita que la imagen sea enfocable
                                />
                            </a>
                        </div>
                        <div className="related-item">
                            <a
                                href="https://view.genially.com/648654c5774f910012dc8587/presentation-movimientos-y-fases-de-la-luna"
                                target="_blank"
                                rel="noopener noreferrer"
                                tabIndex="0"
                                aria-label="Enlace a presentación sobre movimientos y fases de la Luna"
                            >
                                <img
                                    src={images('./moon2.png')}
                                    alt="Infografía sobre las fases de la Luna"
                                    tabIndex="-1" // Evita que la imagen sea enfocable
                                />
                            </a>
                        </div>
                        <div className="related-item">
                            <a
                                href="https://view.genially.com/648654c5774f910012dc8587/presentation-movimientos-y-fases-de-la-luna"
                                target="_blank"
                                rel="noopener noreferrer"
                                tabIndex="0"
                                aria-label="Enlace a presentación sobre movimientos y fases de la Luna"
                            >
                                <img
                                    src={images('./moon3.png')}
                                    alt="Diagrama de las fases de la Luna"
                                    tabIndex="-1" // Evita que la imagen sea enfocable
                                />
                            </a>
                        </div>
                        <div className="related-item">
                            <a
                                href="https://www.youtube.com/watch?v=ma0kKMc9PbE"
                                target="_blank"
                                rel="noopener noreferrer"
                                tabIndex="0"
                                aria-label="Enlace a video sobre las fases de la Luna"
                            >
                                <img
                                    src={images('./moon4.png')}
                                    alt="Video explicativo sobre las fases de la Luna"
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

export default Moon;
