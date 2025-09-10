import React from 'react';
import './CalculatorUI.css';
import { AdCarousel } from '../AdCarousel'; 

const formatCurrency = (value) => {
    if (value === null || value === undefined || isNaN(value) || !isFinite(value)) return "R$ 0,00";
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

export const CalculatorUI = ({ title, platform, calculator }) => {
  const {
    products, setProducts,
    desiredProfitMargin, setDesiredProfitMargin,
    taxRate, setTaxRate,
    recommendedPrice, setRecommendedPrice,
    listingType, setListingType, shippingCostValue, setShippingCostValue, result, resultPanelRef, isDownloading,
    searchResults, isSearchFocused, setIsSearchFocused, aiDescription, isGenerating,
    handleNumericInputChange, addProductToKit, resetCalculator,
    handleProductSelect, generateAIDescription, handleDownloadPdf,
  } = calculator;

  const showResults = parseFloat(String(products[0].price).replace(',', '.')) > 0;
  const kitSubtotal = products.reduce((sum, product) => sum + ((parseFloat(String(product.price).replace(',', '.')) || 0) * (parseInt(product.quantity, 10) || 1)), 0) + (showResults ? 3.0 : 0);

  return (
    <section className="calculator-section" id="calculator">
      <div className="container">

        {/* ======================================================= */}
        {/* === CARROSSEL ADICIONADO AQUI, BEM NO TOPO === */}
        {/* ======================================================= */}
        <AdCarousel />

        <h2 className="section-title text-center">Calculadora de Taxas - {title}</h2>
        <p className="section-subtitle text-center">Monte seu kit, defina seu lucro e descubra o preço de venda ideal.</p>
        <div className="calculator-body">
          <div className="row">
            <div className="col-lg-7">
              <div className="input-panel">
                
                 <div className="form-group search-group">
                  <label>Nome do produto</label>
                  <input type="text" value={products[0].name} onChange={(e) => setProducts([{ ...products[0], name: e.target.value }])} onFocus={() => setIsSearchFocused(0)} onBlur={() => setTimeout(() => setIsSearchFocused(null), 200)} placeholder="Comece a digitar para pesquisar..." />
                  {isSearchFocused === 0 && searchResults.length > 0 && (
                    <ul className="search-results">
                      {searchResults.map((p) => (<li key={p.sku} onClick={() => handleProductSelect(p, 0)}>{p.name}</li>))}
                    </ul>
                  )}
                </div>

                <div className="form-group-inline main-product-inputs">
                  <div className="form-group">
                    <label>Preço por unidade</label>
                    <div className="input-with-icon">
                      <span>R$</span>
                      <input type="text" value={products[0].price} onChange={(e) => handleNumericInputChange(e, (val) => setProducts((current) => [{ ...current[0], price: val }]), "productPrice")} placeholder="0,00" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Quantidade</label>
                    <input type="number" min="1" placeholder="1" value={products[0].quantity} onChange={(e) => handleNumericInputChange(e, (val) => setProducts((current) => [{ ...current[0], quantity: val }]), "productQuantity")} />
                  </div>
                </div>



                {products.map((product, index) => {
                  if (index === 0) return null;
                  return (
                    <div className="kit-item-container" key={index}>
                      <div className="form-group search-group">
                        <label>Nome do {index + 1}º produto</label>
                        <input type="text" value={product.name} onChange={(e) => setProducts(products.map((p, i) => i === index ? { ...p, name: e.target.value } : p))} onFocus={() => setIsSearchFocused(index)} onBlur={() => setTimeout(() => setIsSearchFocused(null), 200)} placeholder={`Ex: Caneca Preta`} />
                        {isSearchFocused === index && searchResults.length > 0 && (
                          <ul className="search-results">
                            {searchResults.map((p) => (<li key={p.sku} onClick={() => handleProductSelect(p, index)}>{p.name}</li>))}
                          </ul>
                        )}
                      </div>
                      <div className="kit-item-details">
                        <div className="form-group"><label>Preço</label><div className="input-with-icon"><span>R$</span><input type="text" value={product.price} onChange={(e) => handleNumericInputChange(e, (val) => setProducts(products.map((p, i) => i === index ? { ...p, price: val } : p)), "productPrice")} placeholder="0,00" /></div></div>
                        <div className="form-group"><label>Qtd.</label><input type="number" min="1" value={product.quantity} onChange={(e) => handleNumericInputChange(e, (val) => setProducts(products.map((p, i) => i === index ? { ...p, quantity: val } : p)), "productQuantity")} placeholder="1" /></div>
                        <div className="form-group"><button type="button" className="remove-product-button" onClick={() => setProducts(products.filter((_, i) => i !== index))}><i className="bi bi-trash"></i> Remover</button></div>
                      </div>
                    </div>
                  );
                })}

                {showResults && (
                  <div className="form-group">
                    <button className="add-product-button" onClick={addProductToKit}>
                      <i className="bi bi-plus-circle"></i> Adicionar mais um produto
                    </button>
                  </div>
                )}
                
                {platform === 'mercadoLivre' && (<div className="form-group"><label>Custo do Frete</label><div className="input-with-icon"><span>R$</span><input type="text" value={shippingCostValue} onChange={(e) => handleNumericInputChange(e, setShippingCostValue, "shippingCost")} disabled={result.recommendedPrice < 79} placeholder="17,00" /></div><small className={`form-text-muted ${result.shippingApplied ? "is-editable" : ""}`}>Altere conforme o valor real que o ML te ofereceu.</small></div>)}
                
                <div className="form-group"><label>Lucro desejado (%)</label><div className="input-with-icon-right"><input type="text" value={desiredProfitMargin} onChange={(e) => handleNumericInputChange(e, setDesiredProfitMargin, "desiredProfitMargin")} /><span>%</span></div></div>

                <div className="form-group"><button className="clear-calculator-button" onClick={resetCalculator}><i className="bi bi-arrow-counterclockwise"></i> Limpar Calculadora</button></div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="result-panel" ref={resultPanelRef}>
                <div className="result-header"><div className="result-label">Custo total (Produtos + Despesas)</div><div className="subtotal-price">{formatCurrency(kitSubtotal)}</div></div>
                <hr className="result-divider" />

                {platform === 'mercadoLivre' && (
                  <div className="form-group">
                    <label>Tipo de anúncio</label>
                    <div className="listing-type-selector">
                      <div className={`listing-type-option ${listingType === "classico" ? "active" : ""}`} onClick={() => setListingType("classico")}><i className="bi bi-shop"></i><h4>Clássico</h4></div>
                      <div className={`listing-type-option ${listingType === "premium" ? "active" : ""}`} onClick={() => setListingType("premium")}><i className="bi bi-gem"></i><h4>Premium</h4></div>
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label>Valor de venda</label>
                  <div className="input-with-icon">
                    <span>R$</span>
                    <input 
                      type="text" 
                      value={recommendedPrice} 
                      onChange={(e) => handleNumericInputChange(e, setRecommendedPrice, 'recommendedPrice')}
                    />
                  </div>
                </div>
                <hr className="result-divider" />
                <ul className="result-breakdown">
                  {result.breakdown.map((item, index) => {
                    if (item.name.startsWith('Imposto')) {
                      return (
                        <li key={index}>
                          <span className="editable-label">
                            Imposto (&nbsp;
                            <input
                              type="text"
                              value={taxRate}
                              onChange={(e) => handleNumericInputChange(e, setTaxRate, "taxRate")}
                              className="result-breakdown-input"
                            />
                            &nbsp;%)
                          </span>
                          <span>{formatCurrency(item.value)}</span>
                        </li>
                      );
                    }
                    return (
                      <li key={index} className={item.isProfit ? (item.value >= 0 ? "profit-item" : "loss-item") : ""}>
                        <span>{item.name}</span>
                        <span>{formatCurrency(item.value)}</span>
                      </li>
                    );
                  })}
                </ul>
                <button onClick={generateAIDescription} className="ai-button" disabled={isGenerating}>{isGenerating ? (<><span className="spinner"></span> Gerando...</>) : (<><i className="bi bi-magic"></i> Gerar Descrição com IA</>)}</button>
                {aiDescription && (<div className="ai-description-box"><textarea value={aiDescription} readOnly rows="6" /></div>)}
                <button onClick={handleDownloadPdf} className="download-pdf-button" disabled={isDownloading}>{isDownloading ? (<><span className="spinner"></span> Baixando...</>) : (<><i className="bi bi-file-earmark-pdf-fill"></i> Baixar Cálculo em PDF</>)}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};