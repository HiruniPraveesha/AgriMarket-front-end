import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const localizer = momentLocalizer(moment);

function ProductCalendar() {
  // State for events
  const [events, setEvents] = useState<any[]>([]);

  // State for modal
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [product, setProduct] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");

  // Function to toggle modal
  const toggleModal = () => setShowModal(!showModal);

  // Function to handle selecting a time slot
  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    const today = new Date();
    if (start >= today) {
      start.setHours(0, 0, 0, 0);
      setSelectedSlot({ start, end });
      setSelectedEvent(null);
      toggleModal();
    } else {
      alert("Products can only be added to days that are after today.");
    }
  };

  // State for selected event
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // Function to handle clicking on an event
  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    const eventId = event.id; // Access the ID of the selected event

    setSelectedEvent(event);
    setProduct(event.title.split(" - ")[0]);
    setNote(event.title.split(" - ")[1]);
    setCategory(event.category);
    toggleModal();
  };

  // Function to handle deleting an event
  const handleDeleteEvent = () => {
    const updatedEvents = events.filter(
      (event) => event.id !== selectedEvent.id
    );
    setEvents(updatedEvents);
    clearFormFields();
    toggleModal();

    axios.delete(`http://localhost:8000/CalendarEvent/${selectedEvent.id}`);
  };

  // Function to clear form fields
  const clearFormFields = () => {
    setProduct("");
    setNote("");
    setCategory("");
  };

  // Function to handle editing an event
  const handleEditEvent = () => {
    const updatedEvents = events.map((event) =>
      event.id === selectedEvent.id
        ? {
            ...event,
            productName: product,
            title: `${product}- ${note}`,
            description: `New stock of ${product} will be available. ${note}.`,
            category,
          }
        : event
    );
    setEvents(updatedEvents);
    toggleModal();
    clearFormFields();

    axios.put(`http://localhost:8000/CalendarEvent/${selectedEvent.id}`, {
      note,
      start: selectedEvent.start,
      productName: product,
      category: category,
    });
  };

  // Function to handle form submission
  const handleFormSubmit = () => {
    const { start, end } = selectedSlot || {};
    if (selectedEvent) {
      handleEditEvent();
    } else {
      setSelectedEvent(null);
      const newEvent = {
        id: events.length + 1,
        title: `${product} - ${note}`,
        start,
        end,
        description: `New stock of ${product} will be available. ${note}.`,
        category,
      };
      setEvents([...events, newEvent]);
      toggleModal();
      clearFormFields();

      axios.post("http://localhost:8000/CalendarEvent", {
        category,
        productName: product,
        note,
        start,
      });
    }
  };

  // Function to handle closing the modal
  const handleModalClose = () => {
    clearFormFields();
    toggleModal();
  };

  // Function to get event style based on category
  const getEventStyle = (event: any) => {
    let style: React.CSSProperties = {
      backgroundColor: "#FFD700",
      color: "#000",
    };

    if (event.category === "Category 1") {
      style.backgroundColor = "green";
      style.color = "#FFF";
    } else if (event.category === "Category 2") {
      style.backgroundColor = "#FF5733";
      style.color = "#FFF";
    } else if (event.category === "Category 3") {
      style.backgroundColor = "#C4A484";
      style.color = "#000";
    }

    return {
      style,
    };
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="my-4" style={{ height: 600 }}>
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
