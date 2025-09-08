import React, { useState } from 'react';
import './Faq.css';

const faqData = [
  {
    question: 'Preciso ter experiência com dropshipping?',
    answer: 'Não! A Unic Drop é projetada tanto para iniciantes quanto para vendedores experientes. Nossa plataforma simplifica o processo para que você possa começar a vender rapidamente.'
  },
  {
    question: 'Com quais marketplaces a Unic Drop se integra?',
    answer: 'Atualmente, oferecemos integração com os principais marketplaces do mercado, como Mercado Livre, Shopee e Amazon, além de plataformas de e-commerce como a Shopify.'
  },
  {
    question: 'Como funciona o suporte ao cliente?',
    answer: 'Oferecemos suporte completo via chat, e-mail e WhatsApp. Nossa equipe está pronta para ajudar com qualquer dúvida técnica ou estratégica para otimizar suas vendas.'
  },
  {
    question: 'Existe algum período de teste gratuito?',
    answer: 'Sim! Oferecemos um período de teste de 7 dias com acesso a todas as funcionalidades da plataforma para que você possa ver na prática como podemos ajudar seu negócio a crescer.'
  }
];

function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <h2 className="section-title text-center">Perguntas Frequentes</h2>
        <div className="accordion">
          {faqData.map((item, index) => (
            <div className={`faq-item ${openIndex === index ? 'active' : ''}`} key={index}>
              <div className="faq-question" onClick={() => handleToggle(index)}>
                {item.question}
                {/* MUDANÇA AQUI: Trocamos o ícone para uma seta */}
                <i className="bi bi-chevron-down faq-arrow-icon"></i>
              </div>
              <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faq;