import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../assets/Logo1.png";
import Bell from "../assets/Bell.svg";
import Cart from "../assets/Cart.svg";
import login from "../assets/Login.svg";
import Search from "../assets/Search.svg";
import language from "../assets/Languages.svg";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure to install axios with npm install axios
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSignOut from 'react-auth-kit/hooks/useSignOut';

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
import { Navbar, Nav, Container } from "react-bootstrap";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
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
  email: string;
  // Add other properties as needed
}

const HeaderNew: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  // const auth = useAuthUser<AuthUser>;
  const authUser = useAuthUser<AuthUser>();
  const userEmail = authUser?.email;
  const navigate = useNavigate();
  const signOut = useSignOut()

  console.log("User Email:", userEmail);
  // const toggleNavbar = () => {
  //   setIsExpanded(!isExpanded);
  // };
  const handleLogout = () => {
    signOut();
    localStorage.clear();
    navigate("/"); // Redirect to the home page or login page after logout
  };

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
          "http://localhost:8000/Category"
        ); // Replace with your backend endpoint
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get<Notification[]>(
        "http://localhost:8000/Notification"
      );
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

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
             {userEmail ? (
              <Nav.Link onClick={handleLogout} style={{ cursor: "pointer" }}>
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link href="/">{userEmail ?? "Login / Register"}</Nav.Link>
            )}
            <Nav.Link href="/">{userEmail ?? "Login / Register"}</Nav.Link>
            <span style={{ margin: "0 10px" }}></span>
            <Link
              to="/selectLogin"
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
          <div className="col-md-2 col-lg-2 col-xl-2 mb-md-0 mt-1 d-flex justify-content-center align-items-center position-relative">
            <button
              onClick={toggleNotifications}
              className="nav-link"
              style={{ margin: "0 10px", background: "none", border: "none" }}
            >
              <img src={Bell} alt="Bell" />
            </button>
            <ToastContainer />
            <Link
              to="/shopping-cart"
              className="nav-link"
              style={{ margin: "0 10px" }}
            >
              <img src={Cart} alt="Cart" />
            </Link>

            {/* Notifications Overlay */}
            {showNotifications && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  right: "0",
                  background: "white",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  zIndex: 1000,
                  width: "300px",
                  maxHeight: "400px",
                  overflowY: "auto",
                  borderRadius: "4px",
                  padding: "10px",
                }}
              >
                {notifications.map((notification, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "10px",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  >
                    <div className="d-flex align-items-center mb-2">
                      <img
                        src={notification.image}
                        alt="Notification"
                        style={{
                          width: "20px",
                          height: "20px",
                          marginRight: "10px",
                        }}
                      />
                      <strong>{notification.title}</strong>
                    </div>
                    <div>{notification.message}</div>
                    <small>{notification.timestamp}</small>
                  </div>
                ))}
              </div>
            )}
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
