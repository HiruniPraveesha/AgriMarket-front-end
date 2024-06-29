// import React, { useState } from "react";
// import { Button, Card, Container, Form } from "react-bootstrap";

// export default function CardPayment() {
//   const [cardNumber, setCardNumber] = useState('');

//   const handleCardNumberChange = (e) => {
//     let formattedValue = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, ''); // Remove spaces and non-digits

//     // Restrict to 16 characters
//     if (formattedValue.length > 16) {
//       formattedValue = formattedValue.substr(0, 16);
//     }

//     // Format with spaces every 4 characters
//     formattedValue = formattedValue.match(new RegExp('.{1,4}', 'g'));
//     if (formattedValue) {
//       formattedValue = formattedValue.join(' ');
//     }

//     setCardNumber(formattedValue || '');
//   };

//   return (
//     <Container fluid>
//       <div className="d-flex justify-content-center">
//         <div style={{ maxWidth: "500px" }}>
//           <Card className="rounded-3">
//             <Card.Body className="p-4">
//               <p className="fw-bold mb-4">Payment Information:</p>
//               <Form.Group className="mb-3">
//                 <Form.Label>Cardholder's Name</Form.Label>
//                 <Form.Control type="text" size="sm" defaultValue="" />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Card Number</Form.Label>
//                 <Form.Control
//                   type="text"
//                   size="sm"
//                   placeholder="**** **** **** ****"
//                   value={cardNumber}
//                   onChange={handleCardNumberChange}
//                 />
//               </Form.Group>
//               <div className="d-flex mb-4">
//                 <Form.Group className="me-2 flex-fill">
//                   <Form.Label>Expire</Form.Label>
//                   <Form.Control type="text" size="sm" placeholder="MM/YYYY" />
//                 </Form.Group>
//                 <Form.Group className="flex-fill">
//                   <Form.Label>CVV</Form.Label>
//                   <Form.Control type="text" size="sm" placeholder="CVV" />
//                 </Form.Group>
//               </div>
//               <Button style={{backgroundColor:'#00BA29'}}>
//                 Pay Rs.1500
//               </Button>
//             </Card.Body>
//           </Card>
//         </div>
//       </div>
//     </Container>
//   );
// }
