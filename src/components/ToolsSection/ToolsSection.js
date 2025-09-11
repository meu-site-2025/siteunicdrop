import React from 'react';
import { Link } from 'react-router-dom'; 
import './ToolsSection.css';

// Logos
import shopeeLogo from '../../assets/images/shopee-logo.png';
import mlLogo from '../../assets/images/ml-logo.png';
import amazonLogo from '../../assets/images/amazon-logo.png';

function ToolsSection() {
  return (
    <section id="ToolsSection" className="tools-section py-5">
      <div className="container">
        {/* Título da Seção */}
        <div className="row text-center mb-5">
          <div className="col">
            <h2 className="section-title">Ferramentas exclusivas</h2>
            <p className="section-subtitle">Soluções práticas para acelerar seu próximo passo</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 mb-4">
            <div className="tools-card h-100">
              <div className="card-header">
                <img src={shopeeLogo} alt="Logo Shopee" className="card-logo" />
                <span className="card-tag tag-shopee">Atualizado</span>
              </div>
              <h5 className="card-title-tool">Shopee</h5>
              <p className="card-text">
                A ferramenta mais completa para vendedores Shopee, com taxas oficiais atualizadas.
              </p>
              <ul className="list-unstyled">
                <li><i className="bi bi-check-circle-fill"></i> Não é necessário cadastro</li>
                <li><i className="bi bi-check-circle-fill"></i> Simulação de lucros</li>
                <li><i className="bi bi-check-circle-fill"></i> Otimização de preços</li>
              </ul>
              <Link to="/calculadora/shopee" className="btn tools-btn mt-auto">Acessar calculadora</Link>
            </div>
          </div>
          <div className="col-lg-4 mb-4">
            <div className="tools-card h-100">
              <div className="card-header">
                <img src={mlLogo} alt="Logo Mercado Livre" className="card-logo" />
                <span className="card-tag tag-ml">Mais usada</span>
              </div>
              <h5 className="card-title-tool">Mercado Livre</h5>
              <p className="card-text">
                Perdido em como calcular as taxas do Mercado Livre? Nossa calculadora é a solução.
              </p>
              <ul className="list-unstyled">
                <li><i className="bi bi-check-circle-fill"></i> Não é necessário cadastro</li>
                <li><i className="bi bi-check-circle-fill"></i> Cálculo de preço desejado</li>
                <li><i className="bi bi-check-circle-fill"></i> Estimativa de custos</li>
              </ul>
              <Link to="/calculadora/mercado-livre" className="btn tools-btn mt-auto">Acessar calculadora</Link>
            </div>
          </div>
          <div className="col-lg-4 mb-4">
            <div className="tools-card h-100">
              <div className="card-header">
                <img src={amazonLogo} alt="Logo Amazon" className="card-logo" />
                <span className="card-tag tag-amazon">Novo</span>
              </div>
              <h5 className="card-title-tool">Amazon</h5>
              <p className="card-text">
                Calcule as taxas da Amazon com precisão e aumente suas vendas.
              </p>
              <ul className="list-unstyled">
                <li><i className="bi bi-check-circle-fill"></i> Não é necessário cadastro</li>
                <li><i className="bi bi-check-circle-fill"></i> Análise de viabilidade</li>
                <li><i className="bi bi-check-circle-fill"></i> Definição de margem de lucro</li>
              </ul>
              <Link to="/calculadora/amazon" className="btn tools-btn mt-auto">Acessar calculadora</Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ToolsSection;