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

  return (
    <section className="calculator-section" id="calculator">
      <div className="container">
        <AdCarousel />

        <h2 className="section-title text-center">Calculadora de Taxas - {title}</h2>
        <p className="section-subtitle text-center">Monte seu kit, defina seu lucro e descubra o preço de venda ideal.</p>
        <div className="calculator-body">
          <div className="row">
            <div className="col-lg-7">
              <div className="input-panel">
                <div className="product-row main-product-row">
                  <div className="form-group search-group">
                    <label>Nome do produto</label>
                    <input type="text" value={products[0].name} onChange={(e) => setProducts([{ ...products[0], name: e.target.value }])} onFocus={() => setIsSearchFocused(0)} onBlur={() => setTimeout(() => setIsSearchFocused(null), 200)} placeholder="Comece a digitar para pesquisar..." />
                    {isSearchFocused === 0 && searchResults.length > 0 && (
                      <ul className="search-results">
                        {searchResults.map((p) => (<li key={p.sku} onClick={() => handleProductSelect(p, 0)}>{p.name}</li>))}
                      </ul>
                    )}
                  </div>
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
                    <div className="product-row kit-item-row" key={index}>
                      <div className="form-group search-group">
                        <label>Nome do {index + 1}º produto</label>
                        <input type="text" value={product.name} onChange={(e) => setProducts(products.map((p, i) => i === index ? { ...p, name: e.target.value } : p))} onFocus={() => setIsSearchFocused(index)} onBlur={() => setTimeout(() => setIsSearchFocused(null), 200)} placeholder={`Ex: Caneca Preta`} />
                        {isSearchFocused === index && searchResults.length > 0 && (
                          <ul className="search-results">
                            {searchResults.map((p) => (<li key={p.sku} onClick={() => handleProductSelect(p, index)}>{p.name}</li>))}
                          </ul>
                        )}
                      </div>
                      <div className="form-group">
                        <label>Preço</label>
                        <div className="input-with-icon">
                          <span>R$</span>
                          <input type="text" value={product.price} onChange={(e) => handleNumericInputChange(e, (val) => setProducts(products.map((p, i) => i === index ? { ...p, price: val } : p)), "productPrice")} placeholder="0,00" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Qtd.</label>
                        <input type="number" min="1" value={product.quantity} onChange={(e) => handleNumericInputChange(e, (val) => setProducts(products.map((p, i) => i === index ? { ...p, quantity: val } : p)), "productQuantity")} placeholder="1" />
                      </div>
                      <div className="form-group">
                         <button type="button" className="remove-product-button" onClick={() => setProducts(products.filter((_, i) => i !== index))}><i className="bi bi-trash"></i></button>
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
                
                <div className="form-group"><label>Lucro desejado (%)</label><div className="input-with-icon-right"><input type="text" value={desiredProfitMargin} onChange={(e) => handleNumericInputChange(e, setDesiredProfitMargin, "desiredProfitMargin")} /><span>%</span></div></div>

                <div className="form-group"><button className="clear-calculator-button" onClick={resetCalculator}><i className="bi bi-arrow-counterclockwise"></i> Limpar Calculadora</button></div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="result-panel" ref={resultPanelRef}>
                <div className="result-header">
                  <div className="result-label">Lucro Líquido</div>
                  <div className={`subtotal-price ${result.expectedProfit >= 0 ? 'profit-item' : 'loss-item'}`}>
                    {formatCurrency(result.expectedProfit)}
                  </div>
                </div>
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
                  <small className="info-tooltip">
                    <i className="bi bi-info-circle-fill"></i> Para editar, digite apenas números. Ponto e vírgula não são permitidos!
                  </small>
                </div>
                <hr className="result-divider" />
                <ul className="result-breakdown">
                  {result.breakdown.map((item, index) => {
                      if (item.isTax) {
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
                      
                      if (item.isShipping) {
                        return (
                          <li key={index}>
                            <span className="editable-label">
                              Custo Frete&nbsp;
                              <input
                                type="text"
                                value={shippingCostValue}
                                onChange={(e) => handleNumericInputChange(e, setShippingCostValue, "shippingCost")}
                                className="result-breakdown-input"
                              />
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