import React from 'react';
import { useCalculator } from '../hooks/useCalculator';
import { CalculatorUI } from '../components/calculators/CalculatorUI';

function AmazonCalculatorPage() {
  const calculatorLogic = useCalculator('amazon');
  return <CalculatorUI title="Amazon" platform="amazon" calculator={calculatorLogic} />;
}
export default AmazonCalculatorPage;