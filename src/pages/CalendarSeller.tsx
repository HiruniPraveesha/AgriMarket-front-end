import React, { useState, useEffect } from "react";
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
  const [category_id, setCategory] = useState("");
  const [sellerId, setSellerId] = useState("");

  // State for categories and products
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const mySeller = localStorage.getItem("sellerId");


  // Fetch categories from the database
  useEffect(() => {
    axios
      .get("http://localhost:8000/Category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Fetch products from the database
  useEffect(() => {
    axios
      .get("http://localhost:8000/Product")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Function to toggle modal
  const toggleModal = () => setShowModal(!showModal);

  const [showAlert, setShowAlert] = useState(false);

  // Function to handle selecting a time slot
  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    const today = new Date();
    if (start >= today) {
      start.setHours(0, 0, 0, 0);
      setSelectedSlot({ start, end });
      setSelectedEvent(null);
      toggleModal();
    } else {
      setShowAlert(true);
    }
  };

  // State for selected event
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // Function to handle clicking on an event
  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setProduct(event.productName);
    setNote(event.note);
    setCategory(event.categoryId);
    setSellerId(event.sellerId);
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

    axios.delete("http://localhost:8000/CalendarSeller/${selectedEvent.id}");
  };

  // Function to clear form fields
  const clearFormFields = () => {
    setProduct("");
    setNote("");
    setCategory("");
    setSellerId("");
  };

  // Function to handle editing an event
  const handleEditEvent = () => {
    const updatedEvents = events.map((event) =>
      event.id === selectedEvent.id
        ? {
            ...event,
            productName: product,
            title: "${product} - ${note}",
            categoryId: category_id,
            sellerId,
          }
        : event
    );
    setEvents(updatedEvents);
    toggleModal();
    clearFormFields();

    axios.put("http://localhost:8000/CalendarSeller/${selectedEvent.id}", {
      note,
      start: selectedEvent.start,
      productName: product,
      categoryId: category_id,
      sellerId,
    });
  };


  // Function to handle form submission
  const handleFormSubmit = () => {
    const { start, end } = selectedSlot || {};
    const selectedProduct = products.find((prod) => prod.name === product);
    const productId = selectedProduct ? selectedProduct.product_id : null;

    if (selectedEvent) {
      handleEditEvent();
    } else {
      setSelectedEvent(null);
      const newEvent = {
        id: events.length + 1,
        title: "${product} - ${note}",
        start,
        end,
        categoryId: category_id,
        sellerId,
        productId, // Add productId to the new event
      };
      setEvents([...events, newEvent]);
      toggleModal();
      clearFormFields();

      axios
        .post("http://localhost:8000/CalendarSeller", {
          categoryId: category_id,
          productName: product,
          note,
          start,
          sellerId,
          productId,
        })
        .then((response) => {
          console.log("Event saved successfully:", response.data);
          // You can optionally update the events state based on the response from the server
        })
        .catch((error) => {
          console.error("Error saving event:", error);
          // Handle the error
        });
    }
  };

  // Function to handle closing the modal
  const handleModalClose = () => {
    clearFormFields();
    toggleModal();
  };

  const handleCloseEvent = () => {
    clearFormFields();
    toggleModal();
  };

  

  // Function to get event style based on category
  const getEventStyle = (event: any) => {
    const categoryColors: { [key: string]: string } = {
      Vegetables: "green",
      Fruits: "#FF5733",
      Grains: "#C4A484",
      Others: "#DCDCDC",
    };

    const defaultColor = "blue"; // Default color for 'Others'

    const categoryColor = categoryColors[event.category] || defaultColor;

    return {
      style: {
        backgroundColor: categoryColor,
        color: "#FFF", // Text color for better visibility
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

      {/* Popup form to edit and add products */}
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
                placeholder={mySeller || ""}

                value={sellerId}
                onChange={(e) => setSellerId(e.target.value)}
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
                value={product}
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
              disabled={!category_id || !product || !sellerId}
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