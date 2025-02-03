import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const images = require.context('../assets', false, /\.(png|jpe?g|svg)$/);

function Header() {
    const username = localStorage.getItem('username'); 
    const location = useLocation(); // Detecta la ruta actual
    const [activeLink, setActiveLink] = useState(location.pathname); // Estado para rastrear la opción activa

    // Maneja el cambio de opción activa
    const handleActiveLink = (path) => {
        setActiveLink(path);
    };

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
                <Link
                    to="/muscles-bones"
                    tabIndex="0"
                    aria-label="Ir a Huesos y Músculos"
                    className={activeLink === '/muscles-bones' ? 'active' : ''}
                    onClick={() => handleActiveLink('/muscles-bones')}
                >
                    Huesos y Músculos
                </Link>
                <Link
                    to="/moon-phases"
                    tabIndex="0"
                    aria-label="Ir a Fases de la Luna"
                    className={activeLink === '/moon-phases' ? 'active' : ''}
                    onClick={() => handleActiveLink('/moon-phases')}
                >
                    Fases de la Luna
                </Link>
                <Link
                    to="/water-cycle"
                    tabIndex="0"
                    aria-label="Ir a Ciclo del Agua"
                    className={activeLink === '/water-cycle' ? 'active' : ''}
                    onClick={() => handleActiveLink('/water-cycle')}
                >
                    Ciclo del Agua
                </Link>
                <Link
                    to="/EarthMovementGame"
                    tabIndex="0"
                    aria-label="Ir a Movimientos de la Tierra"
                    className={activeLink === '/EarthMovementGame' ? 'active' : ''}
                    onClick={() => handleActiveLink('/EarthMovementGame')}
                >
                    <span>Movimientos de</span>
                    <span> la Tierra</span>
                </Link>
                <Link
                    to="/help"
                    tabIndex="0"
                    aria-label="Ir a Ayuda"
                    className={activeLink === '/help' ? 'active' : ''}
                    onClick={() => handleActiveLink('/help')}
                >
                    Ayuda
                </Link>
                <p tabIndex="0" aria-label={`Hola, ${username}!`}>
                    ¡Hola {username}!
                </p>
                <img
                    src={images('./jpoa.png')}
                    alt="Avatar del usuario"
                    tabIndex="0" // Agrega tabIndex para que sea enfocable
                />
            </nav>

            <div className="sesion">
            <button
                tabIndex="0"
                aria-label="Cerrar sesión"
                className={activeLink === '/login' ? 'active' : ''}
                onClick={() => {
                    handleActiveLink('/login');
                    // Navegación programática a través de react-router-dom
                    window.location.href = '/login';
                }}
            >
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
