import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Logo from '../../src/assets/Logo.png'; 

interface SidebarProps {
  defaultSelected: string;
}

const Sidebar: React.FC<SidebarProps> = ({defaultSelected}) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(defaultSelected);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const linkStyle = (menuItem: string) => ({
    color: selectedMenuItem === menuItem ? "blue" : "black",
    fontWeight: selectedMenuItem === menuItem ? "bold" : "normal",
    transition: "all 0.2s ease",
    ...(hoveredItem === menuItem && {
      transform: "translateY(-3px)",
      textDecoration: "underline",
      fontSize: "larger",
      color: "#408d1c",
    })
  });

  const handleMouseEnter = (menuItem: string) => {
    setHoveredItem(menuItem);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <Row className="vh-100" style={{ flexShrink: 0, width: '250px' }} >
      <Col className="bg-light sidebar" style={{display:'flex',borderRadius: '20px',}} >
      <div className="p-4" style={{ maxHeight: "100%", overflowY: "auto" }}>
        <div className="mb-4 mt-2">
          <a href="#">
            <img
              src={Logo}
              style={{ height: "110px", width: "130px" }}
              alt="Logo"
            />
          </a>
        </div>
        <div className="mb-5">
          <a
            href="#"
            className="text-decoration-none"
            style={linkStyle("Dashboard")}
            onClick={() => setSelectedMenuItem("Dashboard")}
            onMouseEnter={() => handleMouseEnter("Dashboard")}
            onMouseLeave={handleMouseLeave}
          >
            Dashboard
          </a>
        </div>

        <div className="mb-5">
          <a
            href="#"
            className="text-decoration-none"
            style={linkStyle("My Products")}
            onClick={() => setSelectedMenuItem("My Products")}
            onMouseEnter={() => handleMouseEnter("My Products")}
            onMouseLeave={handleMouseLeave}
          >
            My Products
          </a>
        </div>

        <div className="mb-5">
          <a
            href="#"
            className="text-decoration-none"
            style={linkStyle("Calendar")}
            onClick={() => setSelectedMenuItem("Calendar")}
            onMouseEnter={() => handleMouseEnter("Calendar")}
            onMouseLeave={handleMouseLeave}
          >
            Calendar
          </a>
        </div>

        <div className="mb-5">
          <a
            href="#"
            className="text-decoration-none"
            style={linkStyle("Settings")}
            onClick={() => setSelectedMenuItem("Settings")}
            onMouseEnter={() => handleMouseEnter("Settings")}
            onMouseLeave={handleMouseLeave}
          >
            Settings
          </a>
        </div>
        <div className="mb-5">
          <a
            href="#"
            className="text-decoration-none"
            style={linkStyle("Discounts")}
            onClick={() => setSelectedMenuItem("Discounts")}
            onMouseEnter={() => handleMouseEnter("Discounts")}
            onMouseLeave={handleMouseLeave}
          >
            Discounts
          </a>
        </div>

        <div className="mb-5">
          <a
            href="#"
            className="text-decoration-none"
            style={linkStyle("Profile")}
            onClick={() => setSelectedMenuItem("Profile")}
            onMouseEnter={() => handleMouseEnter("Profile")}
            onMouseLeave={handleMouseLeave}
          >
            Profile
          </a>
        </div>

        <div className="mb-5">
          <a
            href="#"
            className="text-decoration-none"
            style={linkStyle("Analytics")}
            onClick={() => setSelectedMenuItem("Analytics")}
            onMouseEnter={() => handleMouseEnter("Analytics")}
            onMouseLeave={handleMouseLeave}
          >
            Analytics
          </a>
        </div>

        <div>
          <a
            href="#"
            className="text-decoration-none"
            style={linkStyle("Sign Out")}
            onClick={() => setSelectedMenuItem("Sign Out")}
            onMouseEnter={() => handleMouseEnter("Sign Out")}
            onMouseLeave={handleMouseLeave}
          >
            Sign Out
          </a>
        </div>
      </div>
    </Col>
    </Row>
  );
};

export default Sidebar;
