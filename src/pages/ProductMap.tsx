import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import MainHeader from "../components/Header-main";
import MainFooter from "../components/Footer-main";
import Icon1 from "../assets/icon1.svg";
import Icon2 from "../assets/icon2.svg";
import Icon3 from "../assets/icon3.svg";
import Icon4 from "../assets/icon4.svg";

export default function App() {
  return (
    <div>
      <div style={{ paddingBottom: "10%" }}>
        <MainHeader />
      </div>
      <div className="container">
        <div className="row w-100">
          <div className="col-lg-4 my-4 align-items-center">
            <div className="me-3 mt-2">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Product Map"
                  aria-label="Search"
                  aria-describedby="button-addon2"
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                >
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>
            <div className="p-2" style={{ backgroundColor: "#DFFFC0" }}>
              <div className="me-3 mt-2">
                <Form.Select aria-label="Select District">
                  <option>Select District</option>
                  <option value="1">Colombo</option>
                  <option value="2">Gampaha</option>
                  <option value="3">Kandy</option>
                </Form.Select>
              </div>
              <div className="me-3 mt-4">
                <Form.Select aria-label="Select Farmer">
                  <option>Select Farmer</option>
                  <option value="1">Kasun</option>
                  <option value="2">Kamala</option>
                  <option value="3">Sunethra</option>
                </Form.Select>
              </div>
              <div className="me-3 mt-4 mb-4">
                <Form.Select aria-label="Select Category">
                  <option>Select Category</option>
                  <option value="1">Vegetables</option>
                  <option value="2">Fruits</option>
                  <option value="3">Food</option>
                </Form.Select>
              </div>
            </div>
            <div
              className="p-2 mt-5 d-felx align-items-center justify-content-center"
              style={{ backgroundColor: "#DFFFC0" }}
            >
              <div className="me-3 mt-2">
                <img src={Icon1} style={{ height: "40px", width: "40px" }} />{" "}
                Fruits
              </div>
              <div className="me-3 mt-4">
                <img src={Icon2} style={{ height: "40px", width: "40px" }} />{" "}
                Farmers
              </div>
              <div className="me-3 mt-4">
                <img src={Icon3} style={{ height: "40px", width: "40px" }} />{" "}
                Vegetables
              </div>
              <div className="me-3 mt-4 mb-4">
                <img src={Icon4} style={{ height: "40px", width: "40px" }} />{" "}
                Food
              </div>
            </div>
          </div>

          <div className="col-lg-8 my-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.271597275592!2d80.70525401477377!3d7.873054094345983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2480baef06707%3A0x255a1f345b0a3ba3!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1644329821503!5m2!1sen!2sus"
              className="w-100"
              height="600"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
      <div>
        <MainFooter />
      </div>
    </div>
  );
}
