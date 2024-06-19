// Marker.tsx
import React from "react";
import markerIcon from "../assets/marker-icon.svg"; // Ensure this path is correct

interface MarkerProps {
  lat: number;
  lng: number;
  text: string;
}

const Marker: React.FC<MarkerProps> = ({ text }) => (
  <div style={{ position: "absolute", transform: "translate(-50%, -50%)" }}>
    <img
      src={markerIcon}
      alt={text}
      style={{ height: "30px", width: "30px" }}
    />
    <span>{text}</span>
  </div>
);

export default Marker;
