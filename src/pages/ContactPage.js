import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './ContactPage.css';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const phoneNumber = '5522991046153';
    const messageText = `
Olá, Unic Drop!

Meu nome é ${formData.name}.
Meu e-mail é ${formData.email}.

Gostaria de falar sobre:
${formData.message}
`;

    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <Container fluid className="contact-page-container">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={5}>
          <div className="contact-form-card">
            <h1 className="text-center">Entre em Contato</h1>
            <p className="text-center">Preencha o formulário e fale conosco diretamente pelo WhatsApp!</p>
            <Form onSubmit={handleSubmit} className="contact-form">
              <Form.Group className="mb-4">
                <Form.Label>Nome Completo</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Sua Mensagem</Form.Label>
                <Form.Control
                  as="textarea"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button type="submit" className="submit-button w-100">
                Enviar Mensagem
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ContactPage;