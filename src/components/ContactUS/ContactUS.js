import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white text-center py-5">
        <Container>
          <h1 className="display-4 fw-bold">Contact Us</h1>
          <p className="lead">
            We’re here to help. Reach out to us, and we’ll get back to you as soon as possible.
          </p>
        </Container>
      </div>

      {/* Main Section */}
      <Container className="py-5">
        <Row className="gy-4">
          {/* Contact Details */}
          <Col md={6}>
            <Card className="shadow border-0">
              <Card.Body>
                <h3 className="fw-bold mb-4">Get in Touch</h3>
                <div className="mb-3 d-flex align-items-start">
                  <MapPin className="text-primary me-3" size={24} />
                  <div>
                    <h5>Office Address</h5>
                    <p className="text-muted">
                      123 Pune, Maharashtra, india.
                    </p>
                  </div>
                </div>
                <div className="mb-3 d-flex align-items-start">
                  <Phone className="text-primary me-3" size={24} />
                  <div>
                    <h5>Phone</h5>
                    <p className="text-muted">+917636748736</p>
                  </div>
                </div>
                <div className="mb-3 d-flex align-items-start">
                  <Mail className="text-primary me-3" size={24} />
                  <div>
                    <h5>Email</h5>
                    <p className="text-muted">contact@company.com</p>
                  </div>
                </div>
               
              </Card.Body>
            </Card>
          </Col>

          {/* Contact Form */}
          <Col md={6}>
            <Card className="shadow border-0">
              <Card.Body>
                <h3 className="fw-bold mb-4">Send Us a Message</h3>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Enter the subject"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Write your message"
                      required
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100 d-flex align-items-center justify-content-center gap-2"
                  >
                    <Send />
                    <span>Send Message</span>
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Map Section */}
      <Container fluid className="py-5 bg-light">
        <Row>
          <Col>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-0">
                <iframe
                  title="Location at Kokane Chowk, Pimpri-Chinchwad"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3185.7021355810684!2d73.78792507428905!3d18.597351066826185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b91ec0f9c60f%3A0xda2e9863f5897c92!2sKokane%20Chowk%2C%20Pimpri-Chinchwad%2C%20Maharashtra%20411027!5e1!3m2!1sen!2sin!4v1737535201012!5m2!1sen!2sin"
                  width="100%"
                  height="450"
                  style={{ border: "0" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ContactUs;
