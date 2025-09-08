import React from 'react';
import Slider from 'react-slick';
import './Features.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const featuresData = [
  { icon: 'bi bi-boxes', title: 'Integração Multicanal' },
  { icon: 'bi bi-chat-dots-fill', title: 'Chat com Fornecedor' },
  { icon: 'bi bi-tags-fill', title: 'Produtos Prontos' },
  { icon: 'bi bi-arrow-repeat', title: 'Sincronização Automática' },
  { icon: 'bi bi-robot', title: 'Respostas com IA' },
  { icon: 'bi bi-headset', title: 'Suporte Ágil' },
  { icon: 'bi bi-truck', title: 'Logística Flex' },
  { icon: 'bi bi-graph-up', title: 'Relatórios de Vendas' },
  { icon: 'bi bi-shield-lock-fill', title: 'Segurança de Dados' },
  { icon: 'bi bi-wallet2', title: 'Gestão Financeira' },
  { icon: 'bi bi-star-fill', title: 'Avaliação de Produtos' },
  { icon: 'bi bi-gear-wide-connected', title: 'API para Desenvolvedores' },
  { icon: 'bi bi-palette-fill', title: 'Loja Personalizável' },
  { icon: 'bi bi-file-earmark-zip-fill', title: 'Importação em Massa' },
  { icon: 'bi bi-person-rolodex', title: 'Gerenciador de Clientes' },
  { icon: 'bi bi-bullseye', title: 'Controle de Estoque' },
  { icon: 'bi bi-bell-fill', title: 'Notificações em Tempo Real' },
  { icon: 'bi bi-phone-fill', title: 'App Mobile' },
  { icon: 'bi bi-translate', title: 'Suporte a Múltiplos Idiomas' },
  { icon: 'bi bi-credit-card-fill', title: 'Gateways de Pagamento' },
];

function Features() {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 8000,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };

  return (
    <section className="features-section" id="features">
      <div className="container-fluid">
        <h2 className="section-title text-center">Uma Plataforma Completa Para o Seu Negócio</h2>
        <div className="slider-container">
          <Slider {...settings}>
            {featuresData.map((feature, index) => (
              <div key={index} className="feature-card-wrapper">
                <div className="feature-card">
                  <i className={`feature-icon ${feature.icon}`}></i>
                  <h3 className="feature-title">{feature.title}</h3>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default Features;