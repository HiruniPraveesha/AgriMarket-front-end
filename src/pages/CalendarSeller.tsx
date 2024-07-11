import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const localizer = momentLocalizer(moment);

function ProductCalendar() {
  const [events, setEvents] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [product_id, setProduct] = useState("");
  const [note, setNote] = useState("");
  const [category_id, setCategory] = useState("");
  const [sellerId, setSellerId] = useState(
    localStorage.getItem("sellerId") || ""
  );
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showAlert, setShowAlert] = useState(false);

  // Fetch categories from the database
  useEffect(() => {
    axios
      .get("http://localhost:8080/Category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Fetch products based on seller ID
  useEffect(() => {
    if (sellerId) {
      axios
        .get(`http://localhost:8080/productsCal/seller/${sellerId}`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  }, [sellerId]);

  // Fetch events from the backend
  useEffect(() => {
    axios
      .get(`http://localhost:8080/calendar/${sellerId}`)
      .then((response) => {
        const formattedEvents = response.data.map((event: any) => ({
          id: event.event_id,
          title: `${event.productId} - ${event.note}`,
          start: new Date(event.start),
          end: new Date(event.start), // Adjust if you have an en d time
          description: event.note,
          category: event.categoryId,
          color: getCategoryColor(event.categoryId),
        }));
        setEvents(formattedEvents);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, [sellerId]);

  const toggleModal = () => setShowModal(!showModal);

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    const today = new Date();
    if (start >= today) {
      start.setHours(0, 0, 0, 0);
      setSelectedSlot({ start, end });
      setSelectedEvent(null);
      setProduct("");
      setNote("");
      setCategory("");
      toggleModal();
    } else {
      setShowAlert(true);
    }
  };

  const handleEventClick = (event: any) => {
    axios
      .get(`http://localhost:8080/calendar/event/${event.id}`)
      .then((response) => {
        const eventData = response.data;
        setProduct(eventData.productId);
        setNote(eventData.note);
        setCategory(eventData.categoryId);
        setSelectedEvent(event);
        toggleModal();
      })
      .catch((error) => {
        console.error("Error fetching event details:", error);
      });
  };

  const handleDeleteEvent = () => {
    const updatedEvents = events.filter(
      (event) => event.id !== selectedEvent.id
    );
    setEvents(updatedEvents);
    clearFormFields();
    toggleModal();

    axios
      .delete(`http://localhost:8080/calendar/delete/${selectedEvent.id}`)
      .then((response) => {
        console.log("Event deleted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
      });
  };

  const clearFormFields = () => {
    setProduct("");
    setNote("");
    setCategory("");
  };

  const handleEditEvent = () => {
    const updatedEvents = events.map((event) =>
      event.id === selectedEvent.id
        ? {
            ...event,
            productId: product_id,
            title: `${product_id}- ${note}`,
            categoryId: category_id,
            sellerId,
            color: getCategoryColor(category_id), // Update color based on edited category
          }
        : event
    );
    setEvents(updatedEvents);
    toggleModal();
    clearFormFields();

    axios
      .put(`http://localhost:8080/calendar/update/${selectedEvent.id}`, {
        categoryId: category_id,
        productId: product_id,
        note,
        start: selectedEvent.start,
        sellerId,
      })
      .then((response) => {
        console.log("Event updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating event:", error);
      });
  };

  const handleFormSubmit = () => {
    const { start, end } = selectedSlot || {};
    const selectedProduct = products.find(
      (prod) => prod.product_id === product_id
    );
    const productId = selectedProduct ? selectedProduct.product_id : null;

    if (selectedEvent) {
      handleEditEvent();
    } else {
      setSelectedEvent(null);
      const newEvent = {
        id: events.length + 1,
        title: `${product_id} - ${note}`,
        start,
        end,
        categoryId: category_id,
        sellerId,
        productId: product_id,
        color: getCategoryColor(category_id),
      };
      setEvents([...events, newEvent]);
      toggleModal();
      clearFormFields();

      axios
        .post("http://localhost:8080/calendar/create", {
          categoryId: category_id,
          productId: product_id,
          note,
          start,
          sellerId,
        })
        .then((response) => {
          console.log("Event saved successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error saving event:", error);
        });
    }
  };

  const handleModalClose = () => {
    clearFormFields();
    toggleModal();
  };

  const handleCloseEvent = () => {
    clearFormFields();
    toggleModal();
  };

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
            <Form.Group controlId="sellerId">
              <Form.Label>Seller ID</Form.Label>
              <Form.Control
                type="text"
                placeholder={sellerId}
                value={sellerId}
                readOnly
                required
              />
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={category_id}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select a Category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat.category_id}>
                    {cat.category_id} - {cat.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                as="select"
                value={product_id}
                onChange={(e) => setProduct(e.target.value)}
                required
              >
                <option value="">Select a Product</option>
                {products.map((prod, index) => (
                  <option key={index} value={prod.product_id}>
                    {prod.product_id} - {prod.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="note">
              <Form.Label>Note</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEvent}>
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
              disabled={!category_id || !product_id || !sellerId}
              style={{ backgroundColor: "#00BA29", borderColor: "#00BA29" }}
            >
              Save
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <Modal show={showAlert} onHide={() => setShowAlert(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Products can only be added to days that are after today.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => setShowAlert(false)}
            style={{ backgroundColor: "#00BA29", borderColor: "#00BA29" }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProductCalendar;
