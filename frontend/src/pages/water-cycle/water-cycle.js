import Header from '../../components/header';
import WaterCycleGame from './water-cycle-game/water-cycle-game'; // Importando el componente de juego
const images = require.context('../../assets', false, /\.(png|jpe?g|svg)$/);

const WaterCycle = () => {
    
  return (
    <div>
            <Header/>
            <main>
                <div className="game-container">
                    <div className="water-game">
                        <div className="water-page">
                            <WaterCycleGame />
                        </div>
                    </div>
                    
                                    
    <div className="instructions" tabIndex="0" aria-label="Instrucciones del juego">
    <h2>Instrucciones</h2>
    <ul>
        <li className="small-spacing with-bullet" tabIndex="0">Acumulación: Arrastra esta etiqueta hacia el lago o río en la parte inferior de la imagen.</li>
        <li className="small-spacing with-bullet" tabIndex="0">Precipitación: Arrastra esta etiqueta hacia las gotas de lluvia que caen desde las nubes.</li>
        <li className="small-spacing with-bullet" tabIndex="0">Evaporación: Arrastra esta etiqueta hacia las flechas que suben del agua hacia las nubes...</li>
    </ul>
    </div>


                </div>

                <div className="related-content">
                    <h2>Más contenido relacionado</h2>
                    <div className="related-items">
                        <div className="related-item">
                            <a href="https://www.youtube.com/watch?v=QDCohXW6blg" target="_blank" rel="noopener noreferrer">
                                <img src={images('./water1.png')} alt="El Ciclo del Agua | Videos Educativos para Niños" />
                            </a>
                        </div>
                        <div className="related-item">
                            <a href="https://www.youtube.com/watch?v=3QVj99UGk3Q" target="_blank" rel="noopener noreferrer">
                                <img src={images('./water2.png')} alt="El ciclo del agua para niños - ¿Qué es el ciclo del agua?" />
                            </a>
                        </div>
                        <div className="related-item">
                            <a href="https://www.google.com/search?sca_esv=0b611c99b0894382&sxsrf=AHTn8zrN3YypGO-y3nPTeVeYm-oV2cTQmw:1738680028425&q=ciclo+del+agua&udm=7&fbs=ABzOT_BnMAgCWdhr5zilP5f1cnRvK9uZj3HA_MTJAA6lXR8yQIHhBi298nC38CQZOY2HEJZSPQhZF2kOb4qX1afvODAVWv8m76ktAfVMsqo7irMl89HVIuaXwlUyMxcLMyn5_evcl849gmv34kMFYuFqZn1wXqnEr-YEEPXtglkeiiRWru_1H20xs_hRBueBKRW14Qr730AU&sa=X&ved=2ahUKEwiJqOPrn6qLAxX3SDABHYZaFiQQtKgLegQIEhAB&biw=1536&bih=735&dpr=1.25#" target="_blank" rel="noopener noreferrer">
                                <img src={images('./water3.png')} alt="El ciclo del agua | Camaleón" />
                            </a>
                        </div>
                        <div className="related-item">
                            <a href="https://www.youtube.com/watch?v=9LVXk0sFauM" target="_blank" rel="noopener noreferrer">
                                <img src={images('./water4.png')} alt="La Eduteca - El ciclo del agua" />
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
  );
};

export default WaterCycle;
