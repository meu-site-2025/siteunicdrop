import './Benefits.css';

function Benefits() {
  return (
    <section className="benefits-section" id="benefits">
      <div className="container">
        <h2 className="section-title text-center">Por que escolher a Unic Drop?</h2>
        
        <div className="row align-items-stretch">
          <div className="col-lg-5">
            <div className="benefit-card dark-card h-100">
              <div className="card-icon-wrapper">
                <i className="bi bi-graph-up-arrow benefit-icon"></i>
              </div>
              <h3>Estratégias que Vendem</h3>
              <p>Aproveite nossa experiência para aplicar táticas que realmente impulsionam suas vendas no mercado digital, sem se preocupar com logística, embalagens ou taxações.</p>
              <button className="card-button">Anunciar</button>
            </div>
          </div>
          
          <div className="col-lg-7">
            <div className="benefit-card dark-card h-100">
              <div className="card-icon-wrapper">
                <i className="bi bi-cpu-fill benefit-icon"></i>
              </div>
              <h3>ERP - Automação Inteligente</h3>
              <p>Gerencie seu negócio com dados precisos e em tempo real. Tome decisões estratégicas com base em informações confiáveis.</p>
              <div className="sub-features">
                <div className="sub-feature-item">
                  <i className="bi bi-boxes"></i>
                  <span>Produtos</span>
                </div>
                <div className="sub-feature-item">
                  <i className="bi bi-cloud-arrow-down-fill"></i>
                  <span>Importar</span>
                </div>
                <div className="sub-feature-item">
                  <i className="bi bi-bar-chart-line-fill"></i>
                  <span>Estoques</span>
                </div>
                <div className="sub-feature-item">
                  <i className="bi bi-grid-3x2-gap-fill"></i>
                  <span>Tamanhos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Benefits;