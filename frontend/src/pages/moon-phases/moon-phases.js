import React from 'react';
import './moon-phases.css';
import { ROUTES } from '../../routes';

import { Link } from'react-router-dom';

const images = require.context('../../assets', false, /\.(png|jpe?g|svg)$/);
function Moon() {
    return (
        <div>
            <header>
                <img src={images('./head.png')} alt="Funquiz Logo" />
            </header>
            <nav className="menu">
                <Link to={ROUTES.LOGIN}>Huesos y Músculos</Link>
                <a href={ROUTES.LOGIN}>Fases de la Luna</a>
                <a href={ROUTES.LOGIN}>Ciclo del Agua</a>
                <a href={ROUTES.LOGIN}>Movimientos de la Tierra</a>
                <a href={ROUTES.LOGIN}>Help</a>
            </nav>

            <div className="user">
                <img src={images('./jpoa.png')} alt="User Avatar" />
                <button>Cerrar sesión</button>
            </div>

            <main>
                <div className="game-container">
                    <div className="game">
                        <img src={images('./game.png')} alt="Juego de las fases de la Luna" />
                    </div>
                    <div className="instructions">
                        <h2>Instrucciones</h2>
                        <ul>
                            <li>Usa las flechitas de tu teclado:</li>
                            <li>➡️ (derecha) ⬅️ (izquierda) ⬆️ (arriba) ⬇️ (abajo)</li>
                            <li>Busca las fases de la Luna.</li>
                            <li>Cuando encuentres una fase, aparecerá su nombre y brillará.</li>
                            <li>¡Encuéntralas todas! ¡Buena suerte! 🚀</li>
                        </ul>
                    </div>
                </div>

                <div className="related-content">
                    <h3>Más contenido relacionado</h3>
                    <div className="related-items">
                        <div className="related-item">
                            <img src={images('./moon1.png')} alt="Relacionado 1" />
                            <p>La luna es el único satélite natural...</p>
                        </div>
                        <div className="related-item">
                            <img src={images('./moon2.png')} alt="Relacionado 2" />
                            <p>La luna también causa cambios en la marea...</p>
                        </div>
                        <div className="related-item">
                            <img src={images('./moon3.png')} alt="Relacionado 3" />
                            <p>La luna es más pequeña que la Tierra...</p>
                        </div>
                        <div className="related-item">
                            <img src={images('./moon4.png')} alt="Relacionado 4" />
                            <p>Fases de la Luna: Aprende más...</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Moon;
