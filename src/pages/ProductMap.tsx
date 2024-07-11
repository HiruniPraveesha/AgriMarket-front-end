import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";
import "bootstrap/dist/css/bootstrap.min.css";
import MainHeader from "../components/Header-main";
import MainFooter from "../components/Footer-main";
import axios from "axios";

import Form from "react-bootstrap/Form";

export default function App() {
  const containerStyle = {
    width: "950px",
    height: "650px",
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
    {
      id: number;
      lat: number;
      lng: number;
      text: string;
      category_id: number;
    }[]
  >([]);

  const [sellers, setSellers] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSeller, setSelectedSeller] = useState<string | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<{
    lat: number;
    lng: number;
    text: string;
  } | null>(null);

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
    googleMapsApiKey: "AIzaSyAeISjci_t8f7qOvcYnEzJ4-iEiwfDwokA",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = React.useCallback(
    (map: google.maps.Map) => {
      setMap(map);
      map.fitBounds(bounds);
    },
    [bounds]
  );

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  const fetchPoints = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/products-seller-cities"
      );

      const data = response.data;
      console.log("Fetched points:", data);
      setPoints(
        data.map((item: any) => ({
          id: item.id,
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

  useEffect(() => {
    fetchPoints();
  }, []);

  const getCategoryMarker = (categoryId: number) => {
    switch (categoryId) {
      case 1:
        return "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
      case 2:
        return "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
      case 3:
        return "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
      default:
        return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
    }
  };

  const handleMarkerClick = (marker: {
    lat: number;
    lng: number;
    text: string;
  }) => {
    setSelectedMarker(marker);
  };

  return isLoaded ? (
    <div>
      <MainHeader />
      <div className="container">
        <div className="row w-100">
          <div className="col-lg-4 my-4 align-items-center">
            <div className="p-2" style={{ backgroundColor: "#DFFFC0" }}>
              <div className="me-3 mt-2">
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
                <img
                  src="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                  style={{ height: "40px", width: "40px" }}
                  alt="Fruits"
                />{" "}
                Fruits
              </div>
              <div className="me-3 mt-4">
                <img
                  src="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                  style={{ height: "40px", width: "40px" }}
                  alt="Vegetables"
                />{" "}
                Vegetables
              </div>
              <div className="me-3 mt-4">
                <img
                  src="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                  style={{ height: "40px", width: "40px" }}
                  alt="Grains"
                />{" "}
                Grains
              </div>
              <div className="me-3 mt-4 mb-4">
                <img
                  src="http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
                  style={{ height: "40px", width: "40px" }}
                  alt="Others"
                />{" "}
                Others
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
                  position={{ lat: point.lat, lng: point.lng }}
                  icon={{
                    url: getCategoryMarker(point.category_id),
                  }}
                  onClick={() => handleMarkerClick(point)}
                />
              ))}

              {selectedMarker && (
                <InfoWindow
                  position={{
                    lat: selectedMarker.lat,
                    lng: selectedMarker.lng,
                  }}
                  onCloseClick={() => setSelectedMarker(null)}
                >
                  <div>
                    <h6>{selectedMarker.text}</h6>
                  </div>
                </InfoWindow>
              )}

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
