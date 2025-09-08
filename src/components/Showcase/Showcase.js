import React, { useState } from 'react';
import './Showcase.css';

const showcaseData = {
  erp: [
    { icon: 'bi bi-check-circle-fill', title: 'Cadastre seus produtos', description: 'Adicione e gerencie todo o seu catálogo de produtos em um único lugar.' },
    { icon: 'bi bi-file-earmark-text-fill', title: 'Gerencie fichas técnicas', description: 'Crie fichas técnicas detalhadas para marketplaces, otimizando suas vendas.' },
    { icon: 'bi bi-megaphone-fill', title: 'Anuncie em múltiplas plataformas', description: 'Centralize seus anúncios e publique em diversos canais de venda com um clique.' },
    { icon: 'bi bi-cart-check-fill', title: 'Realize suas vendas', description: 'Acompanhe pedidos, processe pagamentos e gerencie o ciclo de vendas.' },
    { icon: 'bi bi-truck', title: 'Simplifique sua logística', description: 'Controle o estoque, a expedição e o rastreamento de forma integrada.' },
    { icon: 'bi bi-graph-up-arrow', title: 'Centralize e analise suas vendas', description: 'Acompanhe estatísticas detalhadas e gerencie tudo em um só lugar.' },
  ],
  dropshipping: [
    { icon: 'bi bi-search-heart', title: 'Explore nosso catálogo', description: 'Navegue por milhares de produtos de fornecedores verificados e prontos para vender.' },
    { icon: 'bi bi-cloud-upload-fill', title: 'Anuncie facilmente nossos produtos', description: 'Importe produtos para sua loja com um clique, com fotos e descrições otimizadas.' },
    { icon: 'bi bi-cart3', title: 'Cliente realiza a compra', description: 'Seu cliente compra na sua loja, e o pedido é registrado automaticamente por nossa plataforma.' },
    { icon: 'bi bi-credit-card-2-back-fill', title: 'Pagamento ao fornecedor', description: 'O pagamento do custo do produto é repassado de forma segura e automatizada ao fornecedor.' },
    { icon: 'bi bi-box-arrow-up', title: 'Fornecedor despacha o produto', description: 'O fornecedor parceiro embala e envia o produto diretamente para o endereço do seu cliente.' },
    { icon: 'bi bi-cash-coin', title: 'Você recebe o lucro da venda!', description: 'Receba seu lucro diretamente na plataforma integrada, sem complicações.' },
  ]
};


function Showcase() {
  const [activeTab, setActiveTab] = useState('erp');
  const [activeIndex, setActiveIndex] = useState(0);

  const currentTabData = showcaseData[activeTab];

  const handleAccordionClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="showcase-section" id="showcase">
      <div className="container">
        <div className="showcase-tabs">
          <button
            className={`tab-button ${activeTab === 'dropshipping' ? 'active' : ''}`}
            onClick={() => { setActiveTab('dropshipping'); setActiveIndex(0); }}>
            Conheça o Dropshipping
          </button>
          <button
            className={`tab-button ${activeTab === 'erp' ? 'active' : ''}`}
            onClick={() => { setActiveTab('erp'); setActiveIndex(0); }}>
            Conheça nosso ERP
          </button>
        </div>

        <div className="showcase-content">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="accordion-list">
                {currentTabData.map((item, index) => (
                  <div
                    key={index}
                    className={`accordion-item ${activeIndex === index ? 'active' : ''}`}
                    onClick={() => handleAccordionClick(index)}
                  >
                    <div className="accordion-header">
                      <i className={item.icon}></i>
                      <span>{item.title}</span>
                      <i className="bi bi-chevron-down arrow-icon"></i>
                    </div>
                    <div className="accordion-body">
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Showcase;