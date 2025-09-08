import React from 'react';
import './Testimonials.css';

function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="container">
        <h2 className="section-title text-center">O Que Nossos Clientes Dizem</h2>
        <div className="row">
          
          <div className="col-md-6">
            <div className="testimonial-card">
              <i className="bi bi-quote testimonial-quote-icon"></i>
              <p className="testimonial-text">
                "A automação da Unic Drop mudou o jogo para a minha loja. Consegui focar no marketing e minhas vendas dobraram em três meses. Suporte incrível!"
              </p>
              <div className="testimonial-rating">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
              </div>
              <div className="testimonial-author">
                <h4>Joana Silva</h4>
                <span>Loja Top Trend</span>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="testimonial-card">
              <i className="bi bi-quote testimonial-quote-icon"></i>
              <p className="testimonial-text">
                "Estava perdendo muito tempo com a logística dos pedidos. A plataforma da Unic Drop é intuitiva e resolveu toda a minha operação. Recomendo 100%!"
              </p>
              <div className="testimonial-rating">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
              </div>
              <div className="testimonial-author">
                <h4>Marcos Andrade</h4>
                <span>Dropshipping Pro</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;