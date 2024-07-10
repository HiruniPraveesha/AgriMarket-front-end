import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Form, Modal, Button } from "react-bootstrap";
import MainHeader from "../components/Header-main";
import MainFooter from "../components/Footer-main";
import axios from "axios";

const localizer = momentLocalizer(moment);

function ProductCalendar() {
  const [events, setEvents] = useState<any[]>([]);
  const [farmers, setFarmers] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fetch events, farmers, and categories from the backend
  useEffect(() => {
    axios
      .get(`http://localhost:8000/CalendarBuyer`)
      .then((response) => {
        const formattedEvents = response.data.map((event: any) => ({
          id: event.event_id,
          title: `${event.product.product_id} - ${event.product.name} - ${event.note}`,
          start: new Date(event.start),
          end: new Date(event.start), // Adjust if you have an end time
          description: event.note,
          category: event.category.category_id,
          categoryName: event.category.name,
          seller: event.seller.seller_id,
          sellerName: event.seller.store_name,
          color: getCategoryColor(event.category.category_id),
        }));
        setEvents(formattedEvents);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });

    axios
      .get(`http://localhost:8000/getSellers`)
      .then((response) => {
        setFarmers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching farmers:", error);
      });

    axios
      .get(`http://localhost:8000/getCategories`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleSelectEvent = (event: any) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFarmerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFarmer(event.target.value);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  const filteredEvents = selectedCategory
    ? events.filter(
        (event) =>
          event.category === parseInt(selectedCategory) &&
          (selectedFarmer ? event.seller === parseInt(selectedFarmer) : true)
      )
    : events.filter((event) =>
        selectedFarmer ? event.seller === parseInt(selectedFarmer) : true
      );

  // Giving colors to different categories
  const getCategoryColor = (categoryId: string) => {
    const categoryColors: { [key: string]: string } = {
      "1": "green",
      "2": "#FF5733",
      "3": "#C4A484",
      // Add more categories and colors as needed
    };

    const defaultColor = "blue";

    // Get the color for the current event's category_id
    return categoryColors[categoryId] || defaultColor;
  };

  const getEventStyle = (event: any) => {
    return {
      style: {
        backgroundColor: event.color,
        color: "#FFF", // Text color for contrast
      },
    };
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
                <Form.Select
                  aria-label="Select Farmer"
                  onChange={handleFarmerChange}
                >
                  <option value="">Select Seller</option>
                  {farmers.map((farmer: any, index) => (
                    <option key={index} value={farmer.seller_id}>
                      {farmer.store_name}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div className="me-3 mt-4 mb-4">
                <Form.Select
                  aria-label="Select Category"
                  onChange={handleCategoryChange}
                >
                  <option value="">Select Category</option>
                  {categories.map((category: any, index) => (
                    <option key={index} value={category.category_id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </div>
          </div>
          <div className="col-lg-9 my-4" style={{ height: 700 }}>
            <Calendar
              localizer={localizer}
              events={filteredEvents}
              startAccessor="start"
              endAccessor="end"
              defaultDate={new Date()}
              selectable
              views={["month"]}
              step={60}
              showMultiDayTimes
              eventPropGetter={getEventStyle}
              onSelectEvent={handleSelectEvent}
            />
          </div>
        </div>
      </div>
      <MainFooter />

      {/* Event Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEvent?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Description:</strong> {selectedEvent?.description}
          </p>
          <p>
            <strong>Category:</strong> {selectedEvent?.categoryName}
          </p>
          <p>
            <strong>Seller:</strong> {selectedEvent?.sellerName}
          </p>
          {/* Add more event details as needed */}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseModal}
            style={{ backgroundColor: "#00BA29", borderColor: "#00BA29" }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProductCalendar;
