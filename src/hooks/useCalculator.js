import { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import UnicDropLogo from "../assets/images/unicdroplogo.png";

const getMlFixedFee = (price) => {
  if (price > 0 && price < 79) {
    if (price < 29) return 6.25;
    if (price < 50) return 6.5;
    return 6.75;
  }
  return 0;
};

export const useCalculator = (platform) => {
  const [products, setProducts] = useState([{ name: "", price: "", quantity: 1 }]);
  const [desiredProfitMargin, setDesiredProfitMargin] = useState("13");
  const [taxRate, setTaxRate] = useState("4");
  const [recommendedPrice, setRecommendedPrice] = useState("");
  const [listingType, setListingType] = useState("classico");
  const [shippingCostValue, setShippingCostValue] = useState("17.00");
  const [result, setResult] = useState({ breakdown: [], recommendedPrice: 0 });
  const [isDownloading, setIsDownloading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(null);
  const [aiDescription, setAiDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const resultPanelRef = useRef();
  const lastUpdatedField = useRef("desiredProfitMargin");

  const handleNumericInputChange = (e, setter, fieldName) => {
    setter(e.target.value);
    lastUpdatedField.current = fieldName;
  };

  const addProductToKit = () => {
    setProducts([...products, { name: "", price: "", quantity: 1 }]);
  };

  const resetCalculator = () => {
    setProducts([{ name: "", price: "", quantity: 1 }]);
    setDesiredProfitMargin("13");
    setTaxRate("4");
    setRecommendedPrice("");
    setShippingCostValue("17.00");
    setResult({ recommendedPrice: 0, expectedProfit: 0, profitMargin: 0, breakdown: [], shippingApplied: false });
    setAiDescription("");
    lastUpdatedField.current = 'desiredProfitMargin';
  };

  const handleProductSelect = (product, index) => {
    const newProducts = [...products];
    newProducts[index] = { ...newProducts[index], name: product.name, price: product.price };
    setProducts(newProducts);
    setSearchResults([]);
    setIsSearchFocused(null);
    lastUpdatedField.current = "productPrice";
  };

  const handleDownloadPdf = () => {
    setIsDownloading(true);
    const input = resultPanelRef.current;
    if (!input) {
      setIsDownloading(false);
      return;
    }
    const button = input.querySelector(".download-pdf-button");
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
          pdf.addImage(imgData, "PNG", 10, 30, pdfWidth - 20, pdfHeight > 250 ? 250 : pdfHeight - 20);
          pdf.setFontSize(10);
          pdf.setTextColor(150);
          pdf.text("Para mais informações, entre em contato:", 10, pdf.internal.pageSize.getHeight() - 15);
          pdf.setTextColor(67, 180, 224);
          pdf.textWithLink("WhatsApp: (11) 99288-5122", 10, pdf.internal.pageSize.getHeight() - 10, { url: "https://wa.me/5511992885122" });
          pdf.save("calculo_unicdrop.pdf");
          if (button) button.style.display = "flex";
          setIsDownloading(false);
        };
      })
      .catch(() => {
        if(button) button.style.display = "flex";
        setIsDownloading(false)
      });
  };

  const generateAIDescription = async () => {
    const product = products[0];
    if (!product || !product.name) {
      setAiDescription("Por favor, selecione ou digite um produto primeiro para gerar a descrição.");
      return;
    }
    setIsGenerating(true);
    setAiDescription("Gerando descrição, por favor, aguarde...");
    try {
      const response = await fetch("https://unicdrop-backend.onrender.com/api/generate-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName: product.name, productPrice: recommendedPrice }),
      });
      if (!response.ok) {
        throw new Error("Erro ao se conectar com a API de geração de descrição.");
      }
      const data = await response.json();
      setAiDescription(data.description || "");
    } catch (error) {
      console.error("Erro na chamada da API:", error);
      setAiDescription("Ocorreu um erro ao gerar a descrição. Tente novamente mais tarde.");
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (isSearchFocused !== null && products[isSearchFocused]) {
      const activeProductName = products[isSearchFocused].name;
      if (activeProductName && activeProductName.length > 2) {
        fetch(`https://unicdrop-backend.onrender.com/api/products?search=${encodeURIComponent(activeProductName)}`)
          .then((res) => res.json())
          .then((data) => setSearchResults(data))
          .catch((err) => console.error("Erro ao buscar produtos da API:", err));
      } else {
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  }, [products, isSearchFocused]);

  useEffect(() => {
    const expenses = 3.0;
    const totalProductCost = products.reduce((sum, product) => {
      const price = parseFloat(String(product.price).replace(/[^0-9,.-]/g, "").replace(",", ".")) || 0;
      const quantity = parseInt(product.quantity, 10) || 1;
      return sum + price * quantity;
    }, 0);
    const hasProductPrice = parseFloat(String(products[0].price).replace(/[^0-9,.-]/g, "").replace(",", ".")) > 0;
    const expensesValue = hasProductPrice ? expenses : 0;
    const kitSubtotal = totalProductCost + expensesValue;

    if (!hasProductPrice) {
      setResult({ recommendedPrice: 0, expectedProfit: 0, profitMargin: 0, breakdown: [], shippingApplied: false });
      setRecommendedPrice("");
      return;
    }

    const cleanTaxRate = (parseFloat(String(taxRate).replace(/[^0-9,.-]/g, "").replace(",", ".")) / 100) || 0;
    let commissionRate = 0;
    if (platform === 'mercadoLivre') { commissionRate = listingType === 'classico' ? 0.12 : 0.17; }
    else if (platform === 'shopee') { commissionRate = 0.20; }
    else if (platform === 'amazon') { commissionRate = 0.15; }

    let finalPrice = parseFloat(String(recommendedPrice).replace(/[^0-9,.-]/g, "").replace(",", ".")) || 0;
    let cleanDesiredProfitMargin = (parseFloat(String(desiredProfitMargin).replace(/[^0-9,.-]/g, "").replace(",", ".")) / 100) || 0;

    if (lastUpdatedField.current !== 'recommendedPrice' && lastUpdatedField.current !== 'taxRate') {
      const totalFeesAndMargin = commissionRate + cleanTaxRate + cleanDesiredProfitMargin;
      if (totalFeesAndMargin >= 1) {
        setRecommendedPrice("Margem impossível!");
        return;
      }
      let preco = kitSubtotal;
      if (platform === 'mercadoLivre') {
        for (let i = 0; i < 20; i++) {
          const currentPrice = preco;
          let fixedFee = getMlFixedFee(currentPrice);
          let shippingCost = 0;
          if (currentPrice >= 79) {
            shippingCost = parseFloat(String(shippingCostValue).replace(/[^0-9,.-]/g, "").replace(",", ".")) || 0;
          }
          const denom = 1 - commissionRate - cleanTaxRate - cleanDesiredProfitMargin;
          const numerator = kitSubtotal + fixedFee + shippingCost;
          preco = numerator / denom;
          if (Math.abs(preco - currentPrice) < 0.01) break;
        }
      } else {
        let fixedFee = 0;
        if (platform === 'shopee') fixedFee = 4.0;
        if (platform === 'amazon') fixedFee = 5.50;
        preco = (kitSubtotal + fixedFee) / (1 - commissionRate - cleanTaxRate - cleanDesiredProfitMargin);
      }
      finalPrice = preco;
      if (isFinite(finalPrice)) {
        setRecommendedPrice(finalPrice.toFixed(2));
      }
    }

    let fixedFee = 0, shippingCost = 0, shippingApplied = false;
    if (platform === 'mercadoLivre') {
      fixedFee = getMlFixedFee(finalPrice);
      if (finalPrice >= 79) {
        shippingCost = parseFloat(String(shippingCostValue).replace(/[^0-9,.-]/g, "").replace(",", ".")) || 0;
        shippingApplied = true;
      }
    } else {
      if (platform === 'shopee') fixedFee = 4.0;
      if (platform === 'amazon') fixedFee = 5.50;
    }

    const commissionValue = finalPrice * commissionRate;
    const taxValue = finalPrice * cleanTaxRate;
    const expectedProfit = finalPrice - kitSubtotal - commissionValue - taxValue - fixedFee - shippingCost;
    const profitMarginPercent = finalPrice > 0 ? (expectedProfit / finalPrice) * 100 : 0;
    
    if (lastUpdatedField.current === 'recommendedPrice' || lastUpdatedField.current === 'taxRate') {
      setDesiredProfitMargin(profitMarginPercent.toFixed(2));
    }
    
    let breakdown = [
      { name: "Custo Total do(s) Produto(s)", value: totalProductCost },
      { name: "Despesas Operacionais", value: expensesValue },
    ];
    if(platform === 'mercadoLivre') breakdown.push({ name: `Taxa ML (${listingType === "classico" ? "12%" : "17%"})`, value: commissionValue });
    if(platform === 'shopee') breakdown.push({ name: "Taxa Shopee (20%)", value: commissionValue });
    if(platform === 'amazon') breakdown.push({ name: "Taxa Amazon (15%)", value: commissionValue });
    breakdown.push({ name: `Imposto (${taxRate}%)`, value: taxValue });
    if (fixedFee > 0) breakdown.push({ name: "Taxa Fixa", value: fixedFee });
    if (shippingApplied) breakdown.push({ name: "Custo Frete (Frete Grátis)", value: shippingCost });
    breakdown.push({ name: "Lucro Esperado", value: expectedProfit, isProfit: true });

    setResult({ recommendedPrice: finalPrice, expectedProfit, profitMargin: profitMarginPercent, breakdown, shippingApplied });

  }, [products, desiredProfitMargin, platform, listingType, shippingCostValue, recommendedPrice, taxRate]);

  return {
    products, setProducts,
    desiredProfitMargin, setDesiredProfitMargin,
    taxRate, setTaxRate,
    recommendedPrice, setRecommendedPrice,
    listingType, setListingType, shippingCostValue, setShippingCostValue, result, resultPanelRef, isDownloading,
    searchResults, isSearchFocused, setIsSearchFocused, aiDescription, isGenerating,
    handleNumericInputChange, addProductToKit, resetCalculator,
    handleProductSelect, generateAIDescription, handleDownloadPdf,
  };
};