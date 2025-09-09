import React from 'react';
import './Footer.css';
import UnicDropLogo from '../../assets/images/unicdroplogo.png';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row align-items-start">
          <div className="col-lg-3 col-md-12 footer-col">
            <img src={UnicDropLogo} alt="Logo Unic Drop" className="footer-logo" />
            <div className="social-icons">
              <a href="https://www.youtube.com/@Italobto" target="_blank" rel="noopener noreferrer"><i className="bi bi-youtube"></i></a>
              <a href="https://www.instagram.com/italo_bto_/" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram"></i></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-facebook"></i></a>
            </div>
          </div>

          <div className="col-lg-3 col-md-4 footer-col">
            <h4 className="footer-col-title">Extras</h4>
            <ul className="footer-links">
              <li><Link to="/calculadora">Calculadora de Taxas</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-4 footer-col">
            <h4 className="footer-col-title">Suporte</h4>
            <ul className="footer-links">
              <li><Link to="/contato">Contato</Link></li>
              <li>Suporte</li>
              <li>Privacidade</li>
              <li>Termos de uso</li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-4 footer-col">
            <h4 className="footer-col-title">Mais Unic Drop</h4>
            <ul className="footer-links">
              <li>Seja um fornecedor</li>
              <li>Comunidade</li>
              <li>Carreiras</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="container d-flex justify-content-between align-items-center">
          <p className="mb-0">
            &copy; {currentYear} Unic Drop | 
            <a href="/privacy" className="footer-bottom-link"> Privacidade e Termos de Uso</a> | 
            CNPJ: 00.000.000/0000-00
          </p>
            <div className="col-md-6 back-to-top-wrapper">
             <Link to="/#hero">
              <a href="#hero" className="back-to-top-link">
                Voltar ao topo <i className="bi bi-arrow-up"></i>
              </a>
             </Link>
            </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
