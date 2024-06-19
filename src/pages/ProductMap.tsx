import React from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import MainHeader from "../components/Header-main";
import MainFooter from "../components/Footer-main";
import Icon1 from "../assets/icon1.svg";
import Icon2 from "../assets/icon2.svg";
import Icon3 from "../assets/icon3.svg";
import Icon4 from "../assets/icon4.svg";

export default function App() {
  const containerStyle = {
    width: "1000px",
    height: "550px",
  };
  const center = {
    lat: 6.9271,
    lng: 79.8612,
  };

  const points = [
    { lat: 6.9271, lng: 79.8612, text: "Colombo" },
    { lat: 7.2906, lng: 80.6337, text: "Kandy" },
    { lat: 6.9278, lng: 79.8488, text: "Dehiwala" },
    // Add more markers as needed
  ];

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAeISjci_t8f7qOvcYnEzJ4-iEiwfDwokA",
  });

  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  const onLoad = React.useCallback(
    (map: google.maps.Map) => {
      // This is just an example of getting and using the map instance!!! don't just blindly copy!
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);

      setMap(map);
    },
    [center]
  );

  const onUnmount = React.useCallback((map: google.maps.Map) => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div>
      <MainHeader />
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
              className="p-2 mt-5 d-flex flex-column justify-content-center"
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
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={{
                streetViewControl: false,
                mapTypeControl: false,
              }}
            >
              {points.map((point, i) => (
                <MarkerF key={i} position={point}></MarkerF>
              ))}

              {/* Child components, such as markers, info windows, etc. */}
              <></>
            </GoogleMap>
          </div>
        </div>
      </div>
      <MainFooter />
    </div>
  ) : (
    <></>
  );
}
