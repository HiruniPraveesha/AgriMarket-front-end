import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../assets/Logo1.png";
import Bell from "../assets/Bell.svg";
import Cart from "../assets/Cart.svg";
import login from "../assets/Login.svg";
import Search from "../assets/Search.svg";
import language from "../assets/Languages.svg";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Toast from "react-bootstrap/Toast";
import axios from "axios"; // Make sure to install axios with npm install axios
import { Navbar, Nav, Container } from "react-bootstrap";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
// Define the type for the category



interface Category {
  id: number;
  name: string;
}

interface Notification {
  image: string;
  title: string;
  timestamp: string;
  message: string;
}
interface HeaderProps {
  userEmail: string | null; // Define the type of userEmail
}

interface AuthUser {
  email: string ;
  // Add other properties as needed
}

const HeaderNew: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  // const auth = useAuthUser<AuthUser>;
  const authUser = useAuthUser<AuthUser>()
  const userEmail = authUser?.email;
  
  console.log("User Email:", userEmail);
  // const toggleNavbar = () => {
  //   setIsExpanded(!isExpanded);
  // };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Fetch categories from the backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>(
          "http://localhost:8000/CalendarEvent/category"
        ); // Replace with your backend endpoint
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState<Notification | null>(null);

  const toggleShow = () => setShow(!show);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await axios.get("your_api_endpoint_here");
        setNotification(response.data);
      } catch (error) {
        console.error("Error fetching notification:", error);
      }
    };

    fetchNotification();
  }, []);

  return (
    <header
      className={`text-center text-lg-start text-muted ${
        isSticky ? "sticky-top" : ""
      }`}
      style={{
        fontSize: "0.7rem",
        padding: "0",
        marginTop: "0",
        position: isSticky ? "fixed" : "static",
        width: "100%",
        zIndex: "999",
        top: "0",
      }}
    >
      <div className="bg-light" style={{ marginBottom: "0", marginTop: "0" }}>
        <div className="row">
          {/* Dropdown */}
          <div className="col-md-3 col-lg-2 col-xl-2 mb-1 d-flex justify-content-center align-items-center">
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                <img
                  src={language}
                  alt="Language"
                  style={{ width: "18px", height: "18px" }}
                />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">English</Dropdown.Item>
                <Dropdown.Item href="#/action-2">සිංහල</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          {/* Empty Column */}
          <div className="col-md-7 col-lg-7 col-xl-7 mb-1"></div>

          {/* Help & Login/Register */}
          <div className="col-md-2 col-lg-2 col-xl-2 mb-md-0 mb-1 mt-2">
            <a
              href="#"
              className="text-decoration-none"
              style={{ color: "black", fontSize: "12px" }}
            >
              Help
            </a>
            <Nav.Link href="/">{userEmail ?? "Login / Register"}</Nav.Link>
            <span style={{ margin: "0 10px" }}></span>
            <Link
              to="/signIn"
              className="text-decoration-none"
              style={{ color: "#00BA29", fontSize: "12px" }}
            >
              <img
                src={login}
                style={{ width: "14px", height: "12px" }}
                alt="Login"
              />
              {/* <span style={{ margin: "0 2px" }}></span>
              Login/Register */}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header Content */}
      <div className="bg-white">
        <div className="row">
          {/* Logo */}
          <div className="col-md-3 col-lg-2 col-xl-2 mb-1 ml-2 d-flex justify-content-center align-items-center">
            <a href="#">
              <img
                src={Logo}
                style={{ height: "55px", width: "45px" }}
                alt="Logo"
              />
            </a>
          </div>

          {/* Search Bar */}
          <div className="col-md-7 col-lg-7 col-xl-7 mb-1 mt-0 d-flex justify-content-center align-items-center">
            <Dropdown>
              <Dropdown.Toggle
                variant="light"
                id="dropdown-basic"
                style={{
                  backgroundColor: "#00BA29",
                  borderColor: "#00BA29",
                  color: "#FFFFFF",
                  padding: "4px 8px",
                  borderRadius: "0",
                  fontSize: "14px",
                }}
              >
                All categories
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {categories.map((category) => (
                  <Dropdown.Item
                    key={category.id}
                    style={{ padding: "4px 8px" }}
                  >
                    {category.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <input
              className="form-control mr-sm-2"
              type="search"
              aria-label="Search"
              style={{ borderRadius: "0", width: "200px", fontSize: "0.7rem" }}
            />
            <button
              className="btn btn-success my-2 my-sm-0"
              type="submit"
              style={{
                backgroundColor: "#00BA29",
                borderColor: "#00BA29",
                borderRadius: "0",
                padding: "3px 8px",
              }}
            >
              <img src={Search} alt="Search" />
            </button>
          </div>

          {/* Bell & Cart Icons */}
          <div className="col-md-2 col-lg-2 col-xl-2 mb-md-0 mt-1 d-flex justify-content-center align-items-center">
            <button
              onClick={toggleShow}
              className="nav-link"
              style={{ margin: "0 10px" }}
            >
              <img src={Bell} alt="Bell" />
            </button>
            <Toast show={show} onClose={toggleShow}>
              <Toast.Header>
                <img
                  src={
                    notification
                      ? notification.image
                      : "holder.js/20x20?text=%20"
                  }
                  className="rounded me-2"
                  alt=""
                />
                <strong className="me-auto">
                  {notification ? notification.title : "Notification Title"}
                </strong>
                <small>
                  {notification ? notification.timestamp : "Just now"}
                </small>
              </Toast.Header>
              <Toast.Body>
                {notification ? notification.message : "Notification message"}
              </Toast.Body>
            </Toast>
            <a href="#" className="nav-link" style={{ margin: "0 10px" }}>
              <img src={Cart} alt="Cart" />
            </a>
          </div>
        </div>
      </div>

      {/* Additional Navbar */}
      <div className="bg-light">
        <div className="row">
          {/* Navbar */}
          <div className="col-md-9 col-lg-9 col-xl-9 mb-1 mx-auto">
            <nav
              className="navbar navbar-expand-lg navbar-light bg-light text-black"
              style={{
                marginLeft: "75px",
                marginTop: "0",
                marginBottom: "0",
                padding: "0",
              }}
            >
              <div>
                <div
                  className={`collapse navbar-collapse ${
                    isExpanded ? "show" : ""
                  } justify-content-center`}
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item text-black">
                      <Link
                        className="nav-link text-black"
                        to="/HomePage"
                        style={{ fontSize: "12px", paddingRight: "10px" }}
                      >
                        HOME
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link text-black"
                        to="/ProductMap"
                        style={{ fontSize: "12px", paddingRight: "10px" }}
                      >
                        PRODUCT MAP
                      </Link>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link text-black"
                        href="/CalendarBuyer"
                        style={{ fontSize: "12px", paddingRight: "10px" }}
                      >
                        PRODUCT CALENDAR
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link text-black"
                        href="#"
                        style={{ fontSize: "12px" }}
                      >
                        CONTACT US
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>

          {/* Contact Info */}
          <div
            className="col-md-2 col-lg-2 col-xl-2 mb-md-0 mt-1 text-black"
            style={{ fontSize: "12px" }}
          >
            CALL US NOW +94 76 123 4567
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderNew;