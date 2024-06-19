import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import "bootstrap/dist/css/bootstrap.min.css";
import MainHeader from "../components/Header-main";
import MainFooter from "../components/Footer-main";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Icon1 from "../assets/icon1.svg";
import Icon2 from "../assets/icon2.svg";
import Icon3 from "../assets/icon3.svg";
import Icon4 from "../assets/icon4.svg";

export default function App() {
  const containerStyle = {
    width: "950px",
    height: "550px",
  };

  const bounds = {
    north: 9.8284, // Northernmost latitude
    south: 5.9086, // Southernmost latitude
    west: 79.521, // Westernmost longitude
    east: 81.879, // Easternmost longitude
  };

  const center = {
    lat: (bounds.north + bounds.south) / 2,
    lng: (bounds.east + bounds.west) / 2,
  };

  const [points, setPoints] = useState<
    { lat: number; lng: number; text: string; category_id: number }[]
  >([]);

  const [sellers, setSellers] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSeller, setSelectedSeller] = useState<string | null>(null);

  const filteredPoints = selectedCategory
    ? points.filter(
        (point) =>
          point.category_id === selectedCategory &&
          (selectedSeller ? point.text.includes(selectedSeller) : true)
      )
    : points.filter((point) =>
        selectedSeller ? point.text.includes(selectedSeller) : true
      );

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "cccc",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = React.useCallback(
    (map: google.maps.Map) => {
      const googleMap = map;
      googleMap.fitBounds(bounds);
    },
    [bounds]
  );

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/products-seller-cities"
        );

        const data = response.data;
        console.log("Fetched points:", data);
        setPoints(
          data.map((item: any) => ({
            lat: item.lat,
            lng: item.lng,
            text: `${item.store_name} (${item.product_name})`,
            category_id: item.category_id,
          }))
        );

        // Extract seller names from data and remove duplicates
        const sellerNames = [
          ...new Set(data.map((item: any) => item.store_name)),
        ] as string[];
        setSellers(sellerNames);

        // Extract category names from data and remove duplicates
        const categoryNames = [
          ...new Set(data.map((item: any) => item.category_name)),
        ] as string[];
        setCategories(categoryNames);
      } catch (error) {
        console.error("Error fetching points:", error);
      }
    };

    fetchPoints();
  }, []);

  const getCategoryMarker = (categoryId: number) => {
    switch (categoryId) {
      case 1:
        return "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"; // Blue marker for category 1
      case 2:
        return "http://maps.google.com/mapfiles/ms/icons/green-dot.png"; // Green marker for category 2
      case 3:
        return "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"; // Green marker for category 2
      default:
        return "http://maps.google.com/mapfiles/ms/icons/red-dot.png"; // Default red marker for other categories
    }
  };

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
                <h6>Select your city :</h6>
                <Form.Select aria-label="Select District">
                  <option>Select District</option>
                  <option value="1">Colombo</option>
                  <option value="2">Gampaha</option>
                  <option value="3">Kandy</option>
                </Form.Select>
              </div>
              <div className="me-3 mt-4">
                <h6>Select your farmer :</h6>
                <Form.Select
                  aria-label="Select Farmer"
                  onChange={(e) =>
                    setSelectedSeller(
                      e.target.value !== "Select Farmer" ? e.target.value : null
                    )
                  }
                >
                  <option>Select Farmer</option>
                  {sellers.map((seller, index) => (
                    <option key={index} value={seller}>
                      {seller}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div className="me-3 mt-4 mb-4">
                <h6>Select your category :</h6>
                <Form.Select
                  aria-label="Select Category"
                  onChange={(e) =>
                    setSelectedCategory(parseInt(e.target.value))
                  }
                >
                  <option>Select Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={index + 1}>
                      {category}
                    </option>
                  ))}
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
              zoom={7}
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={{
                streetViewControl: false,
                mapTypeControl: false,
              }}
            >
              {filteredPoints.map((point, i) => (
                <MarkerF
                  key={i}
                  position={point}
                  icon={{
                    url: getCategoryMarker(point.category_id),
                  }}
                ></MarkerF>
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
