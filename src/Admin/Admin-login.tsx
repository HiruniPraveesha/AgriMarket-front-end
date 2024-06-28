import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../../assets/Logo.png";

function AdminLogin() {
  return (
    <Container className="my-5 gradient-form">
      <Row className="justify-content-center align-items-center">
        <Col md={6} className="text-center mb-5">
            <div>
              <img src={Logo} style={{ width: "150px" }} alt="logo" />
            </div>
            <div
              style={{
                fontFamily: "Sansita",
                fontSize: "2rem",
                background:
                  "linear-gradient(180deg, #032004 8.13%, #18C01F 62.1%, #00FF0B 73.6%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Agri Market
            </div>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6} className="mb-5">
          <div className="d-flex flex-column">
            <p style={{ fontWeight: "bold", textAlign: "center" }}>
              Admin Login
            </p>

            <Form.Group className="mb-4" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <div className="text-center pt-1 mb-5 pb-1">
              <Button className="mb-4 w-100 gradient-custom-2">Sign in</Button>
              <a className="text-muted" href="#!">
                Forgot password?
              </a>
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">Don't have an account?</p>
              <Button variant="outline-danger" className="mx-2">
                Sign Up
              </Button>
            </div>

          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminLogin;
