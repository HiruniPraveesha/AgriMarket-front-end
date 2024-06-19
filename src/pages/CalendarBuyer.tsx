import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Form } from "react-bootstrap";
import MainHeader from "../components/Header-main";
import MainFooter from "../components/Footer-main";
import axios from "axios"; // Import axios

const localizer = momentLocalizer(moment);

function ProductCalendar() {
  const sampleEvents = [
    {
      id: 1,
      title: "Product A - Available",
      start: new Date(2022, 3, 1, 10, 0),
      end: new Date(2022, 3, 1, 12, 0),
      description: "New stock of Product A available for purchase.",
      category: "Category 1",
      seller: "John Doe",
    },
    {
      id: 2,
      title: "Product B - Out of Stock",
      start: new Date(2022, 3, 5, 15, 0),
      end: new Date(2022, 3, 5, 17, 0),
      description: "Product B is currently out of stock.",
      category: "Category 2",
      seller: "Jane Smith",
    },
    // Add more sample events as needed
  ];

  const [events, setEvents] = useState<any[]>(sampleEvents);
  const [farmers, setFarmers] = useState<string[]>([
    "Kasun",
    "Kamala",
    "Sunethra",
  ]);
  const [categories, setCategories] = useState<string[]>([
    "Vegetables",
    "Fruits",
    "Grains",
  ]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8000/CalendarEvent");
      const formattedEvents = response.data.map((event: any) => ({
        id: event.id,
        title: `${event.productName} - ${event.note}`,
        start: new Date(event.date),
        end: new Date(event.date),
        description: event.note,
        category: event.category,
        seller: event.seller,
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleSelectEvent = (event: any) => {
    alert(`Selected Event: ${event.title}`);
    // You can add your custom logic here to handle the selected event
  };

  return (
    <div>
      <MainHeader />
      <div className="container">
        <div className="mt-2">
          <i>Get your product updates from here .....</i>
        </div>
        <div className="row">
          <div className="col-lg-3 my-4 align-items-center">
            <div className="p-2" style={{ backgroundColor: "#DFFFC0" }}>
              <i>Sort By :</i>
              <div className="me-3 mt-4">
                <Form.Select aria-label="Select Farmer">
                  <option>Select Farmer</option>
                  {farmers.map((farmer, index) => (
                    <option key={index} value={index + 1}>
                      {farmer}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div className="me-3 mt-4 mb-4">
                <Form.Select aria-label="Select Category">
                  <option>Select Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={index + 1}>
                      {category}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </div>
          </div>
          <div className="col-lg-9 my-4" style={{ height: 500 }}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              defaultDate={new Date()}
              selectable
              views={["month"]}
              step={60}
              showMultiDayTimes
              eventPropGetter={(event: any) => ({
                style: {
                  backgroundColor:
                    event.category === "Category 1" ? "green" : "#FFD700",
                  color: event.category === "Category 1" ? "#FFF" : "#000",
                },
              })}
              onSelectEvent={handleSelectEvent}
            />
          </div>
        </div>
      </div>
      <MainFooter />
    </div>
  );
}

export default ProductCalendar;
