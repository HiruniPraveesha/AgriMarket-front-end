import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Modal, Button, Form } from "react-bootstrap";
import MainHeader from "../components/Header-main";
import MainFooter from "../components/Footer-main";

const localizer = momentLocalizer(moment);

function ProductCalendar() {
  // Sample events data
  const [events, setEvents] = useState<any[]>([
    {
      id: 1,
      title: "Product A - Available",
      start: new Date(2022, 3, 1, 10, 0),
      end: new Date(2022, 3, 1, 12, 0),
      description: "New stock of Product A available for purchase.",
      category: "Category 1", // Add category to event data
    },
  ]);

  // State for modal
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [product, setProduct] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");

  // Function to handle opening and closing modal
  const toggleModal = () => setShowModal(!showModal);

  // Function to handle event creation
  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    const today = new Date();
    if (start >= today) {
      setSelectedSlot({ start, end });
      setSelectedEvent(null); // Clear selectedEvent state
      toggleModal();
    } else {
      alert("Products can only be added to days that are after today.");
    }
  };

  // State for selected event
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // Function to handle an event on click
  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setProduct(event.title.split(" - ")[0]);
    setNote(event.title.split(" - ")[1]); // Remove the slice to include the entire note
    setCategory(event.category); // Set the category from the selected event
    toggleModal();
  };

  // Function to handle deleting an event
  const handleDeleteEvent = () => {
    const updatedEvents = events.filter(
      (event) => event.id !== selectedEvent.id
    );
    setEvents(updatedEvents);
    clearFormFields(); // Clear form fields
    toggleModal();
  };

  // Clear the form fields in the clearFormFields function
  const clearFormFields = () => {
    setProduct("");
    setNote("");
    setCategory(""); // Clear the category as well
  };

  // The handleEditEvent function
  const handleEditEvent = () => {
    const updatedEvents = events.map((event) =>
      event.id === selectedEvent.id
        ? {
            ...event,
            title: `${product}${note} - Available`,
            description: `New stock of ${product} will be available. ${note}.`,
            category, // Set the category from the state
          }
        : event
    );
    setEvents(updatedEvents);
    toggleModal();
    clearFormFields();
  };

  // Update the handleFormSubmit function
  const handleFormSubmit = () => {
    const { start, end } = selectedSlot || {};
    if (selectedEvent) {
      handleEditEvent();
    } else {
      setSelectedEvent(null);
      const newEvent = {
        id: events.length + 1,
        title: `${product} ${note} - Available`,
        start,
        end,
        description: `New stock of ${product} will be available. ${note}.`,
        category, // Set the category from the state
      };
      setEvents([...events, newEvent]);
      toggleModal();
      clearFormFields();
    }
  };

  // Function to clear form fields when the modal is closed without saving
  const handleModalClose = () => {
    clearFormFields();
    toggleModal();
  };
  // Function to get event style based on category
  const getEventStyle = (event: any) => {
    let style: React.CSSProperties = {
      backgroundColor: "#FFD700", // Default color
      color: "#000", // Default text color
    };

    if (event.category === "Category 1") {
      style.backgroundColor = "green";
      style.color = "#FFF"; // White text color
    } else if (event.category === "Category 2") {
      style.backgroundColor = "#FF5733";
      style.color = "#FFF"; // White text color
    } else if (event.category === "Category 3") {
      style.backgroundColor = "#C4A484";
      style.color = "#000"; // Black text color
    }

    return {
      style,
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
          </div>
          <div className="col-lg-9 my-4" style={{ height: 500 }}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              defaultDate={new Date()}
              selectable
              onSelectSlot={handleSelectSlot}
              onSelectEvent={handleEventClick}
              eventPropGetter={getEventStyle}
            />
          </div>
        </div>
      </div>
      <MainFooter />

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedEvent ? "Edit" : "Add"} Product Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                <option value="Category 1">Vegetable</option>
                <option value="Category 2">Fruits</option>
                <option value="Category 3">Grains</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="note">
              <Form.Label>Note</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
          {selectedEvent ? (
            <>
              <Button variant="danger" onClick={handleDeleteEvent}>
                Delete
              </Button>
              <Button
                variant="primary"
                onClick={handleEditEvent}
                style={{ backgroundColor: "#00BA29", borderColor: "#00BA29" }}
              >
                Save Changes
              </Button>
            </>
          ) : (
            <Button
              variant="success"
              onClick={handleFormSubmit}
              disabled={!category || !product}
              style={{ backgroundColor: "#00BA29", borderColor: "#00BA29" }}
            >
              Save
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProductCalendar;
