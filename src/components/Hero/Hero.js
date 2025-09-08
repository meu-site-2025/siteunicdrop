import './Hero.css';
import Forma1 from '../../assets/images/elementotresbolhas.png';
import Forma2 from '../../assets/images/elementoduasbolhas.png';
import FotoItalo from '../../assets/images/fotoitalo.png';
import Celular from '../../assets/images/celular.png';

function Hero() {
  return (
    <section className="hero-container" id="hero">
      <img src={Forma1} alt="Elemento decorativo de três bolhas" className="forma-1" />
      <img src={Forma2} alt="Elemento decorativo de duas bolhas" className="forma-2" />

      <div className="container hero-content">
        <div className="row">
          <div className="col-12">
            <h1>Automatize suas vendas e tenha entregas rápidas com estoque nacional</h1>
            <p>Venda sem estoque!!! Com a Unic Drop, você foca na estratégia enquanto nossa plataforma cuida de toda logística.</p>
            <button className="cta-button">Quero saber mais</button>
          </div>
        </div>
      </div>

      <img src={FotoItalo} alt="Foto do Italo" className="hero-foto-italo" />
      <img src={Celular} alt="Foto de celular com aplicativo" className="hero-foto-celular" />
    </section>
  );
}

export default Hero;