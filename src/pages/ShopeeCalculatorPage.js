import React from 'react';
import { useCalculator } from '../hooks/useCalculator';
import { CalculatorUI } from '../components/calculators/CalculatorUI';

function ShopeeCalculatorPage() {
  const calculatorLogic = useCalculator('shopee');
  return <CalculatorUI title="Shopee" platform="shopee" calculator={calculatorLogic} />;
}
export default ShopeeCalculatorPage;