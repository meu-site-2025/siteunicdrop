import React from 'react';
import { useCalculator } from '../hooks/useCalculator';
import { CalculatorUI } from '../components/calculators/CalculatorUI';

function MercadoLivreCalculatorPage() {
  const calculatorLogic = useCalculator('mercadoLivre');
  return <CalculatorUI title="Mercado Livre" platform="mercadoLivre" calculator={calculatorLogic} />;
}
export default MercadoLivreCalculatorPage;