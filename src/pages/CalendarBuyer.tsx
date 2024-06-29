import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Form } from "react-bootstrap";
import MainHeader from "../components/Header-main";
import MainFooter from "../components/Footer-main";
import axios from "axios";

const localizer = momentLocalizer(moment);

function ProductCalendar() {
  const [events, setEvents] = useState<any[]>([]);
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
      const response = await axios.get("http://localhost:8000/CalendarBuyer");
      const formattedEvents = response.data.map((event: any) => ({
        id: event.event_id,
        title: `${event.productName} - ${event.note}`,
        start: new Date(event.start),
        end: new Date(event.start), // Adjust if you have an end time
        description: event.note,
        category: event.categoryId, // Assuming categoryId represents the category name
        seller: event.seller.store_name,
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleSelectEvent = (event: any) => {
    alert(`Selected Event: ${event.title}`);
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
          <div className="col-lg-9 my-4" style={{ height: 700 }}>
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
                  backgroundColor: event.category === 1 ? "green" : "#FFD700", // Adjust based on your category ID logic
                  color: event.category === 1 ? "#FFF" : "#000",
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
