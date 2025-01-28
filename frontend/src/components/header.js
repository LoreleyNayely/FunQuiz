import React from 'react';
import { Link } from 'react-router-dom';
const images = require.context('../assets', false, /\.(png|jpe?g|svg)$/);

function Header() {
    return (
        <>
            <header>
                <img
                    src={images('./head.png')}
                    alt="Logo de Funquiz"
                    tabIndex="0" // Agrega tabIndex para que sea enfocable
                />
            </header>

            <nav className="menu">
                <Link to="/login" tabIndex="0" aria-label="Ir a Huesos y Músculos">
                    Huesos y Músculos
                </Link>
                <Link to="/moon-phases" tabIndex="0" aria-label="Ir a Fases de la Luna">
                    Fases de la Luna
                </Link>
                <Link to="/water-cycle" tabIndex="0" aria-label="Ir a Ciclo del Agua">
                    Ciclo del Agua
                </Link>
                <Link to="/earth-movements" tabIndex="0" aria-label="Ir a Movimientos de la Tierra">
                    <span>Movimientos de</span>
                    <span> la Tierra</span>
                </Link>
                <Link to="/help" tabIndex="0" aria-label="Ir a Ayuda">
                    Help
                </Link>
                <img
                    src={images('./jpoa.png')}
                    alt="Avatar del usuario"
                    tabIndex="0" // Agrega tabIndex para que sea enfocable
                />
            </nav>

            <div className="sesion">
                <button tabIndex="0" aria-label="Cerrar sesión">
                    Cerrar sesión
                    <img
                        src={images('./sesion-icon.png')}
                        alt="Ícono de cerrar sesión"
                        className="sesion-icon"
                        tabIndex="-1" // Evita que el ícono sea enfocable por separado
                    />
                </button>
            </div>
        </>
    );
}

export default Header;