import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./TaxCalculator.css";
import UnicDropLogo from "../../assets/images/unicdroplogo.png";

const getMlFixedFee = (price) => {
  if (price > 0 && price < 79) {
    if (price < 29) return 6.25;
    if (price < 50) return 6.5;
    return 6.75;
  }
  return 0;
};

function TaxCalculator() {
  const [activeCalculator, setActiveCalculator] = useState("mercadoLivre");
  const [products, setProducts] = useState([
    { name: "", price: "", quantity: 1 },
  ]);
  const [wantsKit, setWantsKit] = useState(null);
  const [addDifferentProduct, setAddDifferentProduct] = useState(null);

  const [desiredProfitMargin, setDesiredProfitMargin] = useState("13");
  const [recommendedPrice, setRecommendedPrice] = useState("");

  const expenses = 3.0;
  const [listingType, setListingType] = useState("classico");

  const [shippingCostValue, setShippingCostValue] = useState("17.00");
  const [isShippingEditable, setIsShippingEditable] = useState(true);

  const [result, setResult] = useState({
    recommendedPrice: 0,
    expectedProfit: 0,
    profitMargin: 0,
    breakdown: [],
    shippingApplied: false,
  });

  const resultPanelRef = useRef();
  const [isDownloading, setIsDownloading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [aiDescription, setAiDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const mainProductName = products[0]?.name;

  const lastUpdatedField = useRef(null);

  const generateAIDescription = async () => {
    const product = products[0];
    if (!product || !product.name) {
      setAiDescription(
        "Por favor, selecione ou digite um produto primeiro para gerar a descrição."
      );
      return;
    }

    setIsGenerating(true);
    setAiDescription("Gerando descrição, por favor, aguarde...");

    try {
      const response = await fetch(
        "http://localhost:5001/api/generate-description",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productName: product.name,
            productPrice: recommendedPrice,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Erro ao se conectar com a API de geração de descrição."
        );
      }

      const data = await response.json();
      setAiDescription(data.description || "");
    } catch (error) {
      console.error("Erro na chamada da API:", error);
      setAiDescription(
        "Ocorreu um erro ao gerar a descrição. Tente novamente mais tarde."
      );
    } finally {
      setIsGenerating(false);
    }
  };
  useEffect(() => {
    if (isSearchFocused && mainProductName && mainProductName.length > 2) {
      fetch(
        `http://localhost:5001/api/products?search=${encodeURIComponent(
          mainProductName
        )}`
      )
        .then((res) => res.json())
        .then((data) => setSearchResults(data))
        .catch((err) => console.error("Erro ao buscar produtos da API:", err));
    } else {
      setSearchResults([]);
    }
  }, [mainProductName, isSearchFocused]);

  const handleProductSelect = (product) => {
    const newProducts = [...products];
    newProducts[0] = {
      ...products[0],
      name: product.name,
      price: product.price,
    };
    setProducts(newProducts);
    setSearchResults([]);
    setIsSearchFocused(false);
    lastUpdatedField.current = "productPrice";
  };

  const handleDownloadPdf = () => {
    setIsDownloading(true);
    const input = resultPanelRef.current;
    const button = input ? input.querySelector(".download-pdf-button") : null;
    if (button) button.style.display = "none";
    html2canvas(input, { useCORS: true, backgroundColor: "#0a192f", scale: 2 })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        const logoImg = new Image();
        logoImg.src = UnicDropLogo;
        logoImg.onload = () => {
          pdf.addImage(logoImg, "PNG", 10, 10, 30, 10);
          pdf.addImage(
            imgData,
            "PNG",
            10,
            30,
            pdfWidth - 20,
            pdfHeight > 250 ? 250 : pdfHeight - 20
          );
          pdf.setFontSize(10);
          pdf.setTextColor(150);
          pdf.text(
            "Para mais informações, entre em contato:",
            10,
            pdf.internal.pageSize.getHeight() - 15
          );
          pdf.setTextColor(67, 180, 224);
          pdf.textWithLink(
            "WhatsApp: (11) 99288-5122",
            10,
            pdf.internal.pageSize.getHeight() - 10,
            { url: "https://wa.me/5511992885122" }
          );
          pdf.save("calculo_unicdrop.pdf");
          if (button) button.style.display = "flex";
          setIsDownloading(false);
        };
      })
      .catch(() => setIsDownloading(false));
  };

  const handleNumericInputChange = (e, setter, fieldName) => {
    const value = e.target.value;
    setter(value);
    if (fieldName) lastUpdatedField.current = fieldName;
  };

  const addProductToKit = () => {
    setProducts([...products, { name: "", price: "", quantity: 1 }]);
  };

  const resetCalculator = () => {
    setProducts([{ name: "", price: "", quantity: 1 }]);
    setWantsKit(null);
    setAddDifferentProduct(null);
    setDesiredProfitMargin("13");
    setRecommendedPrice("");
    setShippingCostValue("17.00");
    setResult({
      recommendedPrice: 0,
      expectedProfit: 0,
      profitMargin: 0,
      breakdown: [],
      shippingApplied: false,
    });
    setAiDescription("");
  };

  const resetKitFlow = () => {
    setWantsKit(null);
    setAddDifferentProduct(null);
    setProducts((currentProducts) => [{ ...currentProducts[0], quantity: 1 }]);
  };

  const handleWantsKitChoice = (choice) => {
    setWantsKit(choice);
    if (choice === "sim") {
      if (parseInt(products[0].quantity, 10) === 1) {
        setProducts((current) => [{ ...current[0], quantity: 1 }]);
      }
    } else {
      resetKitFlow();
    }
  };

  const handleAddDifferentProductChoice = (choice) => {
    setAddDifferentProduct(choice);
    if (choice === "sim" && products.length === 1) {
      addProductToKit();
    } else if (choice === "nao") {
      setProducts(products.slice(0, 1));
    }
  };

  useEffect(() => {
    const totalProductCost = products.reduce((sum, product) => {
      const price =
        parseFloat(
          String(product.price)
            .replace(/[^0-9,.-]/g, "")
            .replace(",", ".")
        ) || 0;
      const quantity = parseInt(product.quantity, 10) || 1;
      return sum + price * quantity;
    }, 0);

    const hasProductPrice =
      parseFloat(
        String(products[0].price)
          .replace(/[^0-9,.-]/g, "")
          .replace(",", ".")
      ) > 0;
    const expensesValue = hasProductPrice ? expenses : 0;
    const kitSubtotal = totalProductCost + expensesValue;

    if (!hasProductPrice) {
      setResult({
        recommendedPrice: 0,
        expectedProfit: 0,
        profitMargin: 0,
        breakdown: [],
        shippingApplied: false,
      });
      setRecommendedPrice("");
      return;
    }

    const cleanDesiredProfitMargin =
      parseFloat(
        String(desiredProfitMargin)
          .replace(/[^0-9,.-]/g, "")
          .replace(",", ".")
      ) / 100 || 0;

    const commissionRate =
      activeCalculator === "mercadoLivre"
        ? listingType === "classico"
          ? 0.12
          : 0.17
        : 0.2;
    const taxRate = activeCalculator === "mercadoLivre" ? 0.04 : 0.04;

    const totalFeesAndMargin =
      commissionRate + taxRate + cleanDesiredProfitMargin;

    if (totalFeesAndMargin >= 1) {
      setRecommendedPrice("Margem impossível!");
      setResult({
        recommendedPrice: 0,
        expectedProfit: 0,
        profitMargin: 0,
        breakdown: [
          { name: "Erro de Cálculo", value: "Margem desejada impossível" },
        ],
        shippingApplied: false,
      });
      setIsShippingEditable(false);
      return;
    }

    const calculatePriceFromMargin = (desiredMarginFraction) => {
      const maxIter = 20;
      let preco = kitSubtotal * (1 + desiredMarginFraction);
      let fixedFee = 0;
      let shippingCost = 0;
      let shippingApplied = false;

      for (let i = 0; i < maxIter; i++) {
        const currentPrice = preco;
        if (activeCalculator === "mercadoLivre") {
          fixedFee = currentPrice < 79 ? getMlFixedFee(currentPrice) : 0;
          if (currentPrice >= 79) {
            shippingCost =
              parseFloat(
                String(shippingCostValue)
                  .replace(/[^0-9,.-]/g, "")
                  .replace(",", ".")
              ) || 0;
            shippingApplied = true;
          } else {
            shippingCost = 0;
            shippingApplied = false;
          }
        } else {
          // Shopee
          fixedFee = 4.0;
          shippingCost = 0;
          shippingApplied = false;
        }
        const denom = 1 - commissionRate - taxRate - desiredMarginFraction;
        const numerator = kitSubtotal + fixedFee + shippingCost;
        const newPreco = numerator / denom;
        if (Math.abs(newPreco - currentPrice) < 0.01) {
          preco = newPreco;
          break;
        }
        preco = newPreco;
      }

      return { preco, fixedFee, shippingCost, shippingApplied, error: false };
    };

    const calc = calculatePriceFromMargin(cleanDesiredProfitMargin);

    const finalPrice = calc.preco;
    const fixedFee = calc.fixedFee;
    const shippingCost = calc.shippingCost;
    const shippingApplied = calc.shippingApplied;

    const formatted = Number.isFinite(finalPrice)
      ? finalPrice.toFixed(2)
      : "0.00";
    setRecommendedPrice(formatted);

    const commissionValue = finalPrice * commissionRate;
    const taxValue = finalPrice * taxRate;

    const expectedProfit =
      finalPrice -
      kitSubtotal -
      commissionValue -
      taxValue -
      fixedFee -
      shippingCost;

    const profitMarginPercent =
      finalPrice > 0 ? (expectedProfit / finalPrice) * 100 : 0;

    const breakdown = [
      { name: "Custo Total do(s) Produto(s)", value: totalProductCost },
      { name: "Despesas Operacionais", value: expensesValue },
      {
        name: `Taxa ML (${listingType === "classico" ? "12%" : "17%"})`,
        value: commissionValue,
      },
      { name: "Imposto (4%)", value: taxValue },
    ];
    if (fixedFee > 0) breakdown.push({ name: "Taxa Fixa", value: fixedFee });
    if (shippingApplied)
      breakdown.push({
        name: "Custo Frete (Frete Grátis)",
        value: shippingCost,
      });
    breakdown.push({
      name: "Lucro Esperado",
      value: expectedProfit,
      isProfit: true,
    });

    setResult({
      recommendedPrice: finalPrice,
      expectedProfit,
      profitMargin: profitMarginPercent,
      breakdown,
      shippingApplied,
    });

    setIsShippingEditable(
      activeCalculator === "mercadoLivre" && finalPrice >= 79
    );
  }, [
    products,
    desiredProfitMargin,
    activeCalculator,
    listingType,
    shippingCostValue,
  ]);

  const formatCurrency = (value) => {
    if (value === null || value === undefined) return "R$ 0,00";
    if (isNaN(value) || !isFinite(value)) return "R$ 0,00";
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const showResults =
    parseFloat(
      String(products[0].price)
        .replace(/[^0-9,.-]/g, "")
        .replace(",", ".")
    ) > 0;
  const kitSubtotal =
    products.reduce(
      (sum, product) =>
        sum +
        (parseFloat(
          String(product.price)
            .replace(/[^0-9,.-]/g, "")
            .replace(",", ".")
        ) || 0) *
          (parseInt(product.quantity, 10) || 1),
      0
    ) + (showResults ? expenses : 0);

  return (
    <section className="calculator-section" id="calculator">
      <div className="container">
        <h2 className="section-title text-center">Calculadora de Taxas</h2>
        <p className="section-subtitle text-center">
          Monte seu kit, defina seu lucro e descubra o preço de venda ideal.
        </p>
        <div className="calculator-tabs">
          <button
            className={`tab-button mercado-livre-tab ${
              activeCalculator === "mercadoLivre" ? "active" : ""
            }`}
            onClick={() => setActiveCalculator("mercadoLivre")}
          >
            Mercado Livre
          </button>
          <button
            className={`tab-button shopee-tab ${
              activeCalculator === "shopee" ? "active" : ""
            }`}
            onClick={() => setActiveCalculator("shopee")}
          >
            Shopee
          </button>
        </div>
        <div className="calculator-body">
          <div className="row">
            <div className="col-lg-7">
              <div className="input-panel">
                <div className="form-group search-group">
                  <label>Nome do produto</label>
                  <input
                    type="text"
                    value={products[0].name}
                    onChange={(e) => {
                      const newProducts = [...products];
                      newProducts[0].name = e.target.value;
                      setProducts(newProducts);
                    }}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() =>
                      setTimeout(() => setIsSearchFocused(false), 200)
                    }
                    placeholder="Comece a digitar para pesquisar..."
                  />
                  {isSearchFocused && searchResults.length > 0 && (
                    <ul className="search-results">
                      {searchResults.map((p) => (
                        <li key={p.sku} onClick={() => handleProductSelect(p)}>
                          {p.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="form-group">
                  <label>Preço por unidade</label>
                  <div className="input-with-icon">
                    <span>R$</span>
                    <input
                      type="text"
                      value={products[0].price}
                      onChange={(e) =>
                        handleNumericInputChange(
                          e,
                          (val) =>
                            setProducts((current) => [
                              { ...current[0], price: val },
                            ]),
                          "productPrice"
                        )
                      }
                      placeholder="0,00"
                    />
                  </div>
                </div>

                {showResults && (
                  <>
                    <div className="form-group">
                      <label>Despesas Operacionais</label>
                      <div className="input-with-icon">
                        <span>R$</span>
                        <input
                          type="text"
                          value={expenses}
                          disabled
                          placeholder="3,00"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Deseja montar um kit?</label>
                      <div className="choice-buttons">
                        <button
                          className={wantsKit === "sim" ? "active" : ""}
                          onClick={() => handleWantsKitChoice("sim")}
                        >
                          Sim
                        </button>
                        <button
                          className={wantsKit === "nao" ? "active" : ""}
                          onClick={() => handleWantsKitChoice("nao")}
                        >
                          Não
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {wantsKit === "sim" && (
                  <>
                    <div className="form-group">
                      <label>
                        Quantidade de "{products[0].name || "Produto Principal"}
                        "
                      </label>
                      <input
                        type="text"
                        value={products[0].quantity}
                        onChange={(e) =>
                          handleNumericInputChange(
                            e,
                            (val) =>
                              setProducts((current) => [
                                { ...current[0], quantity: val },
                              ]),
                            "productQuantity"
                          )
                        }
                        placeholder="1"
                        min="1"
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Deseja adicionar um produto diferente ao kit?
                      </label>
                      <div className="choice-buttons">
                        <button
                          className={
                            addDifferentProduct === "sim" ? "active" : ""
                          }
                          onClick={() => handleAddDifferentProductChoice("sim")}
                        >
                          Sim
                        </button>
                        <button
                          className={
                            addDifferentProduct === "nao" ? "active" : ""
                          }
                          onClick={() => handleAddDifferentProductChoice("nao")}
                        >
                          Não
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {addDifferentProduct === "sim" &&
                  products.map((product, index) => {
                    if (index === 0) return null;
                    return (
                      <div className="form-group-inline" key={index}>
                        <div className="form-group">
                          <label>Nome do {index + 1}º produto</label>
                          <input
                            type="text"
                            value={product.name}
                            onChange={(e) => {
                              const newProducts = [...products];
                              newProducts[index].name = e.target.value;
                              setProducts(newProducts);
                            }}
                            placeholder={`Ex: Caneca Preta`}
                          />
                        </div>

                        <div className="form-group">
                          <label>Preço</label>
                          <div className="input-with-icon">
                            <span>R$</span>
                            <input
                              type="text"
                              value={product.price}
                              onChange={(e) =>
                                handleNumericInputChange(
                                  e,
                                  (val) =>
                                    setProducts((current) =>
                                      current.map((p, i) =>
                                        i === index ? { ...p, price: val } : p
                                      )
                                    ),
                                  "productPrice"
                                )
                              }
                              placeholder="0,00"
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label>Qtd.</label>
                          <input
                            type="text"
                            value={product.quantity}
                            onChange={(e) =>
                              handleNumericInputChange(
                                e,
                                (val) =>
                                  setProducts((current) =>
                                    current.map((p, i) =>
                                      i === index ? { ...p, quantity: val } : p
                                    )
                                  ),
                                "productQuantity"
                              )
                            }
                            placeholder="1"
                            min="1"
                          />
                        </div>

                        <div className="form-group">
                          <button
                            type="button"
                            className="remove-product-button"
                            onClick={() =>
                              setProducts(
                                products.filter((_, i) => i !== index)
                              )
                            }
                          >
                            <i className="bi bi-trash"></i> Remover
                          </button>
                        </div>
                      </div>
                    );
                  })}
                {addDifferentProduct === "sim" && (
                  <div className="form-group">
                    <button
                      className="add-product-button"
                      onClick={addProductToKit}
                    >
                      <i className="bi bi-plus-circle"></i> Adicionar mais um
                      produto
                    </button>
                  </div>
                )}

                {activeCalculator === "mercadoLivre" && (
                  <div className="form-group">
                    <label>
                      Custo do Frete (editável e considerado no lucro)
                    </label>
                    <div className="input-with-icon">
                      <span>R$</span>
                      <input
                        type="text"
                        value={shippingCostValue}
                        onChange={(e) =>
                          handleNumericInputChange(
                            e,
                            setShippingCostValue,
                            "shippingCost"
                          )
                        }
                        disabled={result.recommendedPrice < 79}
                        placeholder="17,00"
                      />
                    </div>
                    <small
                      className={`form-text-muted ${
                        isShippingEditable ? "is-editable" : ""
                      }`}
                    >
                      Valor do frete editável — Altere conforme o valor real que
                      o ML te ofereceu. (útil para variações por conta/cubagem).
                    </small>
                  </div>
                )}

                <div className="form-group">
                  <label>Lucro desejado (%)</label>
                  <div className="input-with-icon-right">
                    <input
                      type="text"
                      value={desiredProfitMargin}
                      onChange={(e) =>
                        handleNumericInputChange(
                          e,
                          setDesiredProfitMargin,
                          "desiredProfitMargin"
                        )
                      }
                    />
                    <span>%</span>
                  </div>
                </div>

                {activeCalculator === "mercadoLivre" && (
                  <div className="form-group">
                    <label>Tipo de anúncio</label>
                    <div className="listing-type-selector">
                      <div
                        className={`listing-type-option ${
                          listingType === "classico" ? "active" : ""
                        }`}
                        onClick={() => setListingType("classico")}
                      >
                        <i className="bi bi-shop"></i>
                        <h4>Clássico</h4>
                      </div>
                      <div
                        className={`listing-type-option ${
                          listingType === "premium" ? "active" : ""
                        }`}
                        onClick={() => setListingType("premium")}
                      >
                        <i className="bi bi-gem"></i>
                        <h4>Premium</h4>
                      </div>
                    </div>
                  </div>
                )}
                <div className="form-group">
                  <button
                    className="clear-calculator-button"
                    onClick={resetCalculator}
                  >
                    <i className="bi bi-arrow-counterclockwise"></i> Limpar
                    Calculadora
                  </button>
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="result-panel" ref={resultPanelRef}>
                <div className="result-header">
                  <div className="result-label">
                    Custo total (Produtos + Despesas)
                  </div>
                  <div className="subtotal-price">
                    {formatCurrency(kitSubtotal)}
                  </div>
                </div>
                <hr className="result-divider" />
                <div className="form-group">
                  <label>Valor de venda recomendado</label>
                  <div className="input-with-icon">
                    <span>R$</span>
                    <input type="text" value={recommendedPrice} readOnly />
                  </div>
                </div>
                <hr className="result-divider" />
                <ul className="result-breakdown">
                  {result.breakdown.map((item, index) => (
                    <li
                      key={index}
                      className={
                        item.isProfit
                          ? item.value >= 0
                            ? "profit-item"
                            : "loss-item"
                          : ""
                      }
                    >
                      <span>{item.name}</span>
                      <span>{formatCurrency(item.value)}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={generateAIDescription}
                  className="ai-button"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <span className="spinner"></span>
                      Gerando...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-magic"></i> Gerar Descrição com IA
                    </>
                  )}
                </button>

                {aiDescription && (
                  <div className="ai-description-box">
                    <textarea value={aiDescription} readOnly rows="6" />
                  </div>
                )}

                <button
                  onClick={handleDownloadPdf}
                  className="download-pdf-button"
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <>
                      <span className="spinner"></span>
                      Baixando...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-file-earmark-pdf-fill"></i>
                      Baixar Cálculo em PDF
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TaxCalculator;
