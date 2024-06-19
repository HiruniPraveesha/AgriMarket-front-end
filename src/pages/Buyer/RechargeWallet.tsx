import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import MainHeader from '../../components/Header-main';
import MainFooter from "../../components/Footer-main";

export default function App() {
  const [cards, setCards] = useState(["**** **** **** 3193", "**** **** **** 4296"]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [newCardDetails, setNewCardDetails] = useState({
    cardholderName: "Anna Doe",
    cardNumber: "1234 5678 1234 5678",
    expire: "MM/YYYY",
    cvv: "CVV"
  });

  const handleSelectCard = (cardNumber) => {
    setSelectedCard(cardNumber);
  };

  const handleRemoveCard = (cardNumber) => {
    const updatedCards = cards.filter(card => card !== cardNumber);
    setCards(updatedCards);
    // If the removed card was selected, reset selectedCard state
    if (selectedCard === cardNumber) {
      setSelectedCard(null);
    }
  };

  const handlePayment = () => {
    if (selectedCard) {
      // Perform payment logic here
      console.log("Payment successful with card number:", selectedCard);
    } else {
      console.log("Please select a card to make a payment.");
    }
  };

  const handleNewCardSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Add new card to the list of cards
    setCards([...cards, newCardDetails.cardNumber]);
    // Reset new card details
    setNewCardDetails({
      cardholderName: "",
      cardNumber: "",
      expire: "",
      cvv: ""
    });
  };

  return (
    <>
    <MainHeader/>
    <Container className="py-5">
      <Row className=" d-flex justify-content-center">
        <Col md="10" lg="8" xl="5">
          <Card className="rounded-3">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h3>Settings</h3>
                <h6>Payment</h6>
              </div>
              <p className="fw-bold mb-4 pb-2">Saved cards:</p>
              {cards.map((cardNumber, index) => (
                <div
                  key={index}
                  className={`d-flex flex-row align-items-center mb-4 pb-1 ${selectedCard === cardNumber ? 'selected-card' : ''}`}
                  onClick={() => handleSelectCard(cardNumber)}
                >
                  <img
                    className="img-fluid"
                    src={cardNumber.startsWith('**** **** **** 3') ?
                      "https://img.icons8.com/color/48/000000/mastercard-logo.png" :
                      "https://img.icons8.com/color/48/000000/visa.png"
                    }
                    alt={cardNumber.startsWith('**** **** **** 3') ? "Mastercard Logo" : "Visa Logo"}
                  />
                  <div className="flex-fill mx-3">
                    <Form.Control
                      type="text"
                      size="lg"
                      value={cardNumber}
                      readOnly
                    />
                  </div>
                  <Button variant="link" onClick={(e) => { e.preventDefault(); handleRemoveCard(cardNumber); }}>
                    Remove card
                  </Button>
                </div>
              ))}
              <p className="fw-bold mb-4">Add new card:</p>
              <Form onSubmit={handleNewCardSubmit}>
                <Form.Control
                  type="text"
                  size="lg"
                  placeholder="Cardholder's Name"
                  value={newCardDetails.cardholderName}
                  onChange={(e) => setNewCardDetails({ ...newCardDetails, cardholderName: e.target.value })}
                />
                <Row className="my-4">
                  <Col xs="7">
                    <Form.Control
                      type="text"
                      size="lg"
                      placeholder="Card Number"
                      value={newCardDetails.cardNumber}
                      onChange={(e) => setNewCardDetails({ ...newCardDetails, cardNumber: e.target.value })}
                    />
                  </Col>
                  <Col xs="3">
                    <Form.Control
                      type="text"
                      size="lg"
                      placeholder="Expire"
                      value={newCardDetails.expire}
                      onChange={(e) => setNewCardDetails({ ...newCardDetails, expire: e.target.value })}
                    />
                  </Col>
                  <Col xs="2">
                    <Form.Control
                      type="text"
                      size="lg"
                      placeholder="CVV"
                      value={newCardDetails.cvv}
                      onChange={(e) => setNewCardDetails({ ...newCardDetails, cvv: e.target.value })}
                    />
                  </Col>
                </Row>
                <Button variant="success" size="lg" block type="submit">
                  Add Card
                </Button>
              </Form>
              <Button variant="success" size="lg" block onClick={handlePayment} disabled={!selectedCard}>
                Make Payment
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    <MainFooter/>
    </>
  );
}
