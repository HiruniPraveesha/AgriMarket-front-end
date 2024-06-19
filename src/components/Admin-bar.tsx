import { useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import Logo from "../../src/assets/Logo.png";

const AdminNavigation = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const cardStyle = (menuItem: string) => ({
    backgroundColor: selectedMenuItem === menuItem ? "#408d1c" : "#DFFFC0",
    color: selectedMenuItem === menuItem ? "white" : "black",
    transition: "all 0.2s ease",
    ...(hoveredItem === menuItem && {
      transform: "scale(1.05)",
      fontSize: "larger",
    }),
    height: "200px",
    width: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  const handleMouseEnter = (menuItem: string) => {
    setHoveredItem(menuItem);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "url('https://c4.wallpaperflare.com/wallpaper/967/61/303/nature-field-wheat-field-summer-wallpaper-preview.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(8px)",
          zIndex: 0,
        }}
      ></div>
      <Container
        className="mt-2 p-4"
        style={{ zIndex: 1, position: "relative" }}
      >
        <Row className="justify-content-center">
          <Col md="auto" className="text-center mb-4">
            <a href="#">
              <img
                src={Logo}
                style={{ height: "110px", width: "130px" }}
                alt="Logo"
              />
            </a>
            <p style={{ fontSize: "25px", fontWeight: "bold", color: "white" }}>
              Admin Dashboard
            </p>
          </Col>
        </Row>

        <hr
          style={{
            borderColor: "white",
            marginTop: "-15px",
            marginBottom: "30px",
          }}
        />

        <Row className="justify-content-center">
          <Col md="auto" className="mb-4">
            <Card
              onClick={() => setSelectedMenuItem("Dashboard")}
              onMouseEnter={() => handleMouseEnter("Dashboard")}
              onMouseLeave={handleMouseLeave}
              style={cardStyle("Dashboard")}
              className="text-center p-3"
            >
              <Card.Body
                style={{
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%"
                }}
              >
                DASHBOARD
              </Card.Body>
            </Card>
          </Col>
          <Col md="auto" className="mb-4">
            <Card
              onClick={() => setSelectedMenuItem("Sellers")}
              onMouseEnter={() => handleMouseEnter("Sellers")}
              onMouseLeave={handleMouseLeave}
              style={cardStyle("Sellers")}
              className="text-center p-3"
            >
              <Card.Body
                style={{
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                SELLERS
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="auto" className="mb-4">
            <Card
              onClick={() => setSelectedMenuItem("Buyers")}
              onMouseEnter={() => handleMouseEnter("Buyers")}
              onMouseLeave={handleMouseLeave}
              style={cardStyle("Buyers")}
              className="text-center p-3"
            >
              <Card.Body
                style={{
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                BUYERS
              </Card.Body>
            </Card>
          </Col>
          <Col md="auto" className="mb-4">
            <Card
              onClick={() => setSelectedMenuItem("Products")}
              onMouseEnter={() => handleMouseEnter("Products")}
              onMouseLeave={handleMouseLeave}
              style={cardStyle("Products")}
              className="text-center p-3"
            >
              <Card.Body
                style={{
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                PRODUCTS
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
      </Container>
    </div>
  );
};

export default AdminNavigation;
