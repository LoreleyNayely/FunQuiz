import React from 'react';
import './moon-phases.css';

import { Link } from'react-router-dom';

const images = require.context('../../assets', false, /\.(png|jpe?g|svg)$/);
function Moon() {
    return (
        
        <div>
            <header>
                <img src={images('./head.png')} alt="Funquiz Logo" />
            </header>
            <nav className="menu">
                <Link to="/login">Huesos y Músculos</Link>
                <Link to="/login">Fases de la Luna</Link>
                <Link to="/login">Ciclo del Agua</Link>
                <Link to="/login">
                    <span>Movimientos de</span>
                    <span> la Tierra</span>
                </Link>

                <Link to="/login">Help</Link>
                <img src={images('./jpoa.png')} alt="User Avatar" />
            </nav>

            <div className="sesion">
                <button>Cerrar sesión</button>
            </div>
        <div className="content"></div>
            <main>
                <div className="game-container">
                    <div className="game">
                        <img src={images('./game.png')} alt="Juego de las fases de la Luna" />
                    </div>
                    
                    <div class="instructions">
                        <h2>Instrucciones</h2>
                        <ul>
                            <li class="small-spacing with-bullet">Usa las flechitas de tu teclado:</li>
                            <li class="small-spacing"><b>➡️ (derecha) ⬅️ (izquierda)</b></li>
                            <li class="large-spacing"><b>⬆️ (arriba) ⬇️ (abajo)</b></li>
                            <li class="large-spacing with-bullet">Busca las fases de la Luna.</li>
                            <li class="small-spacing with-bullet">Cuando encuentres una fase,</li>
                            <li class="large-spacing"><b>¡aparecerá su nombre y brillará!</b></li>
                            <li class="small-spacing with-bullet">¡Encuéntralas todas!</li>
                            <li class="small-spacing">¡Buena suerte! 🚀</li>
                        </ul>
                    </div>

                </div>

                <div className="related-content">
                    <h2>Más contenido relacionado</h2>
                    <div className="related-items">
                        <div className="related-item">
                            <img src={images('./moon1.png')} alt="Relacionado 1" />
                        </div>
                        <div className="related-item">
                            <img src={images('./moon2.png')} alt="Relacionado 2" />
                        </div>
                        <div className="related-item">
                            <img src={images('./moon3.png')} alt="Relacionado 3" />
                        </div>
                        <div className="related-item">
                            <img src={images('./moon4.png')} alt="Relacionado 4" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Moon;
