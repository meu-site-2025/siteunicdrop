import React from 'react';
import './CalculatorIntro.css';

function CalculatorIntro() {
  return (
    <section className="calculator-intro-section" id='CalculatorIntro'>
      <div className="container">
        <h2 className="section-title text-center">Por que escolher nossa calculadora?</h2>
        <p className="section-subtitle text-center">
          A ferramenta mais completa e precisa para calcular taxas da Shopee e Mercado Livre.
        </p>
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="intro-card">
              <div className="card-icon-wrapper">
                <i className="bi bi-tools"></i>
              </div>
              <h3>Recursos avançados</h3>
              <ul className="features-list">
                <li><i className="bi bi-check-circle-fill"></i> Cálculo de preço desejado</li>
                <li><i className="bi bi-check-circle-fill"></i> Análise de viabilidade</li>
                <li><i className="bi bi-check-circle-fill"></i> Simulação de lucros</li>
                <li><i className="bi bi-check-circle-fill"></i> Otimização de preços</li>
              </ul>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <div className="intro-card">
              <div className="card-icon-wrapper">
                <i className="bi bi-calculator-fill"></i>
              </div>
              <h3>Calculadora Shopee & Mercado Livre</h3>
              <p>Nossa calculadora de taxas é a ferramenta definitiva para vendedores que querem maximizar seus lucros. Com cálculos precisos das taxas de 2025, você pode definir preços competitivos e aumentar suas vendas.</p>
            </div>
          </div>

          <div className="col-lg-4 col-md-12 mb-4">
            <div className="intro-card">
              <div className="card-icon-wrapper">
                <i className="bi bi-question-circle-fill"></i>
              </div>
              <h3>Como funciona?</h3>
              <p>Nossa calculadora utiliza as taxas oficiais da Shopee e Mercado Livre atualizadas para 2025. Insira o custo do produto, defina seu preço desejado e veja instantaneamente todas as taxas, comissões e seu lucro real.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CalculatorIntro;