import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import backgroundImage from "../../assets/buyerSeller.png";

const SelectLogin: React.FC = () => {
  return (
    <div style={{ margin: "0 20%" }}>
      <div
        className="container d-flex flex-column align-items-center justify-content-center vh-100"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover", // Adjust as needed
          backgroundPosition: "center", // Center the background
        }}
      >
        <div className="mb-4 fs-2 text-white">ARE YOU A BUYER OR SELLER ?</div>
        <div className="d-flex flex-column flex-md-row my-5">
          <button
            type="button"
            className="btn btn-buyer mb-3 mb-md-0 me-md-2 py-4 px-5 mx-5"
            style={{
              backgroundColor: "#DFFFC0",
              borderRadius: "55px",
              color: "#00BA29",
              fontSize: "30px",
            }}
          >
            BUYER
          </button>
          <button
            type="button"
            className="btn btn-seller py-4 px-5 mx-5 "
            style={{
              backgroundColor: "#DFFFC0",
              borderRadius: "55px",
              color: "#00BA29",
              fontSize: "30px",
            }}
          >
            SELLER
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectLogin;
