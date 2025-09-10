import React, { useState, useEffect } from 'react';
// 1. Importe o HashLink e o renomeie para Link para não precisar mudar o resto do código
import { HashLink as Link } from 'react-router-hash-link'; 
import { useLocation } from 'react-router-dom';
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

  // 2. Simplificamos este useEffect
  useEffect(() => {
    // Apenas fecha o menu mobile ao navegar
    setMenuOpen(false);

    // A lógica de rolagem para o HASH (`#ToolsSection`) agora é 
    // controlada automaticamente pelo HashLink que importamos.

    // Esta parte continua útil para rolar ao topo quando não há um hash.
    if (!location.hash) {
      // Usamos um pequeno timeout para garantir que a transição de página termine
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 0);
    }
  }, [location]);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`custom-navbar ${isSticky ? 'sticky' : ''}`}>
      <div className="navbar-content">
        {/* Usamos o 'smooth' para que a rolagem para o #hero também seja suave */}
        <Link smooth to="/#hero">
          <img src={UnicDropLogo} alt="Logo Unic Drop" className="navbar-logo" />
        </Link>
        <div className="nav-right">
          <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            {/* Adicionamos a propriedade 'smooth' para ativar a rolagem suave */}
            <li><Link smooth to="/#benefits">Benefícios</Link></li>
            <li><Link smooth to="/#ToolsSection">Calculadora de Taxas</Link></li>
            <li><Link smooth to="/#features">Funcionalidades</Link></li>
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