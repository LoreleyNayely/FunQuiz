import Header from '../../components/header';
import WaterCycleGame from './water-cycle-game/water-cycle-game'; // Importando el componente de juego
const images = require.context('../../assets', false, /\.(png|jpe?g|svg)$/);

const WaterCycle = () => {
  return (
    <div>
            <Header/>
            <main>
                <div className="game-container">
                    <div className="game">
                        <div className="moon-phases-page">
                            <WaterCycleGame />
                        </div>
                    </div>
                    
                    <div class="instructions">
                        <h2>Instrucciones</h2>
                        <ul>
                            <li class="small-spacing with-bullet">Acumulación: Arrastra esta etiqueta hacia el lago o río en la parte inferior de la imagen.</li>
                            <li class="small-spacing with-bullet">Precipitación: Arrastra esta etiqueta hacia las gotas de lluvia que caen desde las nubes.</li>
                            <li class="small-spacing with-bullet">Evaporación: Arrastra esta etiqueta hacia las flechas que suben del agua hacia las nubes...</li>
                        </ul>
                    </div>

                </div>

                <div className="related-content">
                    <h2>Más contenido relacionado</h2>
                    <div className="related-items">
                        <div className="related-item">
                            <a href="https://view.genially.com/648654c5774f910012dc8587/presentation-movimientos-y-fases-de-la-luna" target="_blank" rel="noopener noreferrer">
                                <img src={images('./water1.png')} alt="Relacionado 1" />
                            </a>
                        </div>
                        <div className="related-item">
                            <a href="https://view.genially.com/648654c5774f910012dc8587/presentation-movimientos-y-fases-de-la-luna" target="_blank" rel="noopener noreferrer">
                                <img src={images('./water2.png')} alt="Relacionado 2" />
                            </a>
                        </div>
                        <div className="related-item">
                            <a href="https://view.genially.com/648654c5774f910012dc8587/presentation-movimientos-y-fases-de-la-luna" target="_blank" rel="noopener noreferrer">
                                <img src={images('./water3.png')} alt="Relacionado 3" />
                            </a>
                        </div>
                        <div className="related-item">
                            <a href="https://www.youtube.com/watch?v=ma0kKMc9PbE" target="_blank" rel="noopener noreferrer">
                                <img src={images('./water4.png')} alt="Relacionado 4" />
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
  );
};

export default WaterCycle;
