import React from 'react';
import './Pricing.css';

const plansData = [
  {
    name: 'Grátis',
    description: 'Comece a vender agora mesmo com apenas uma integração de vendas.',
    price: 'Sem custo',
    priceDetails: '',
    features: [
      'Plataforma 100% automatizada',
      'Sem taxa de configuração',
      'Estoque automático entre plataformas',
      'Despache imediato',
      '50 Anúncios',
      '1 Integração',
      '6% Comissão por venda'
    ],
    highlighted: false
  },
  {
    name: 'Só o Começo Drop',
    description: 'Aumente sua quantidade de anúncios e escolha mais uma integração.',
    price: 'R$ 49,90',
    priceDetails: '/ano',
    features: [
      'Plataforma 100% automatizada',
      'Sem taxa de configuração',
      'Estoque automático entre plataformas',
      'Despache imediato',
      '100 Anúncios',
      '2 Integrações',
      '3% Comissão por venda'
    ],
    highlighted: false
  },
  {
    name: 'Escalar Drop',
    description: 'Venda sem limites de anúncios, integrações e sem nenhuma comissão por venda.',
    price: 'R$ 99,90',
    priceDetails: '/mês',
    features: [
      'Plataforma 100% automatizada',
      'Sem taxa de configuração',
      'Estoque automático entre plataformas',
      'Despache imediato',
      'Acesso à assistentes IA',
      'Anúncios Sem limite',
      'Integrações Sem limite',
      '0% Comissão por venda'
    ],
    highlighted: true,
    badge: 'Mais vendido'
  },
  {
    name: 'Full Prime',
    description: 'Adicione seus próprios produtos e venda em marketplaces e lojas virtuais.',
    price: 'R$ 149,90',
    priceDetails: '/mês',
    features: [
      'Tudo do Escalar Drop',
      'Acesso ERP',
      'Guia de tamanhos',
      'Gerenciamento de estoque',
      'Limite de integrações ERP: 1'
    ],
    highlighted: false
  }
];

function Pricing() {
  return (
    <section className="pricing-section" id="pricing">
      <div className="container">
        <h2 className="section-title text-center">Nossos Planos</h2>
        <p className="section-subtitle text-center">
          Trabalhamos com opções que atendem às suas necessidades.
        </p>

        <div className="row">
          {plansData.map((plan, index) => (
            <div className="col-lg-3 col-md-6" key={index}>
              <div className={`pricing-card ${plan.highlighted ? 'highlighted' : ''}`}>
                {plan.badge && <div className="badge">{plan.badge}</div>}
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-description">{plan.description}</p>
                <div className="plan-price">
                  {plan.price} <span>{plan.priceDetails}</span>
                </div>
                <a href="#contact" className="plan-cta">Comece agora <i className="bi bi-arrow-right"></i></a>
                <ul className="plan-features">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}><i className="bi bi-check-lg"></i> {feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;