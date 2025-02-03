import React, { useState } from 'react';
import './moon-phases.css';
import Maze from '../moon-phases/moon-game/maze';
import Timer from '../moon-phases/moon-game/timer';
import Controls from '../moon-phases/moon-game/controls';
import Header from '../../components/header';

const images = require.context('../../assets', false, /\.(png|jpe?g|svg)$/);

function Moon() {
    const [isSoundOn, setIsSoundOn] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);

    return (
        <div>
            <Header />
            <main>
                {/* Contenedor del juego */}
                <div className="game-container">
                    <div className="game">
                        <div className="moon-phases-page" tabIndex="0">
                            <Timer />
                            <Maze />
                            <Controls
                                isSoundOn={isSoundOn}
                                setIsSoundOn={setIsSoundOn}
                                isFullscreen={isFullscreen}
                                setIsFullscreen={setIsFullscreen}
                                containerClass="game" 
                            />
                        </div>
                    </div>

                    {/* Instrucciones del juego */}
                    <div className="instructions" tabIndex="0" aria-label="Instrucciones del juego">
                        <h2>Instrucciones</h2>
                        <ul>
                            <li className="small-spacing with-bullet">Usa las flechitas de tu teclado:</li>
                            <li className="small-spacing"><b>➡️ (derecha) ⬅️ (izquierda)</b></li>
                            <li className="large-spacing"><b>⬆️ (arriba) ⬇️ (abajo)</b></li>
                            <li className="large-spacing with-bullet">Busca las fases de la Luna.</li>
                            <li className="small-spacing with-bullet">Cuando encuentres una fase,</li>
                            <li className="large-spacing"><b>¡aparecerá su nombre y brillará!</b></li>
                            <li className="small-spacing with-bullet">¡Encuéntralas todas!</li>
                            <li className="small-spacing">¡Buena suerte! 🚀</li>
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