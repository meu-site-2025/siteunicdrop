import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Adicione Navigate
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar/Navbar.js';
import Footer from './components/Footer/Footer.js';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage.js';

// Importe as novas páginas que vamos criar
import MercadoLivreCalculatorPage from './pages/MercadoLivreCalculatorPage';
import ShopeeCalculatorPage from './pages/ShopeeCalculatorPage';
import AmazonCalculatorPage from './pages/AmazonCalculatorPage';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contato" element={<ContactPage />} />

          {/* Rota antiga redireciona para a nova padrão */}
          <Route path="/calculadora" element={<Navigate to="/calculadora/mercado-livre" />} />

          {/* Novas rotas específicas */}
          <Route path="/calculadora/mercado-livre" element={<MercadoLivreCalculatorPage />} />
          <Route path="/calculadora/shopee" element={<ShopeeCalculatorPage />} />
          <Route path="/calculadora/amazon" element={<AmazonCalculatorPage />} />

        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;