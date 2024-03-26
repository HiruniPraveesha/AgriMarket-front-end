import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { OverlayTrigger, Popover, Modal, Button, Form } from "react-bootstrap";
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
    },
    {
      id: 2,
      title: "Product B - Restocking",
      start: new Date(2022, 3, 2, 13, 0),
      end: new Date(2022, 3, 2, 15, 0),
      description: "Product B will be restocked at this time.",
    },
  ]);

  // State for modal
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [product, setProduct] = useState("");
  const [availableTime, setAvailableTime] = useState("");

  // Function to handle opening and closing modal
  const toggleModal = () => setShowModal(!showModal);

  // Function to handle event creation
  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setSelectedSlot({ start, end });
    toggleModal();
  };

  // State for selected event
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // Function to handle event click
  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
  };

  // Function to handle form submission in modal
  const handleFormSubmit = () => {
    const { start, end } = selectedSlot;
    const newEvent = {
      id: events.length + 1,
      title: `${product} - Available`,
      start,
      end,
      description: `New stock of ${product} available at ${availableTime}.`,
    };
    setEvents([...events, newEvent]);
    toggleModal();
    setProduct("");
    setAvailableTime("");
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
            />
            {selectedEvent && (
              <OverlayTrigger
                trigger="click"
                placement="top"
                overlay={
                  <Popover id="event-details-popover" className="bg-success">
                    <Popover.Header as="h3">
                      {selectedEvent.title}
                    </Popover.Header>
                    <Popover.Body>{selectedEvent.description}</Popover.Body>
                  </Popover>
                }
              >
                <Button style={{ display: "none" }} />
              </OverlayTrigger>
            )}
          </div>
        </div>
      </div>
      <MainFooter />

      <Modal show={showModal} onHide={toggleModal} className="bg-green">
        <Modal.Header closeButton>
          <Modal.Title>Add Event Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="availableTime">
              <Form.Label>Note</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a note"
                value={availableTime}
                onChange={(e) => setAvailableTime(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFormSubmit}>
            Save Event
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProductCalendar;
