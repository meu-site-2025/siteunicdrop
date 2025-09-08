import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import UnicDropLogo from '../../assets/images/unicdroplogo.png';

function Navbar() {
  const [isSticky, setSticky] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);

    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`custom-navbar ${isSticky ? 'sticky' : ''}`}>
      <div className="navbar-content">
        <Link to="/#hero">
          <img src={UnicDropLogo} alt="Logo Unic Drop" className="navbar-logo" />
        </Link>
        <div className="nav-right">
          <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <li><Link to="/#benefits">Benefícios</Link></li>
            <li><Link to="/calculadora">Calculadora de Taxas</Link></li>
            <li><Link to="/#features">Funcionalidades</Link></li>
            <li><Link to="/contato">Contato</Link></li>
            <li><a href="https://app.unicdrop.com.br/login" target="_blank" rel="noopener noreferrer">Área do Cliente</a></li>
          </ul>
          <a href="https://wa.me/5511992885122" target="_blank" rel="noopener noreferrer" className="navbar-cta">
            Fale Conosco
          </a>
        </div>
        <div className="hamburger-menu" onClick={toggleMenu}>
          {isMenuOpen ? <i className="bi bi-x-lg"></i> : <i className="bi bi-list"></i>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;