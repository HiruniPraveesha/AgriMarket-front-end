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
  const [product, setProduct] = useState("");
  const [note, setNote] = useState("");
  const [category_id, setCategory] = useState("");
  const [sellerId, setSellerId] = useState(
    localStorage.getItem("sellerId") || ""
  );

  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  // Fetch categories from the backend
  useEffect(() => {
    axios
      .get("http://localhost:8000/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Fetch products based on seller ID and selected category
  useEffect(() => {
    if (sellerId && category_id) {
      axios
        .get(
          `http://localhost:8000/products?sellerId=${sellerId}&categoryId=${category_id}`
        )
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  }, [sellerId, category_id]);

  // Fetch events from the backend
  useEffect(() => {
    axios
      .get("http://localhost:8000/events")
      .then((response) => {
        const fetchedEvents = response.data.map((event: any) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        setEvents(fetchedEvents);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  const toggleModal = () => setShowModal(!showModal);

  const [showAlert, setShowAlert] = useState(false);

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

  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setProduct(event.productName);
    setNote(event.note);
    setCategory(event.categoryId);
    toggleModal();
  };

  const handleDeleteEvent = () => {
    const updatedEvents = events.filter(
      (event) => event.id !== selectedEvent.id
    );
    setEvents(updatedEvents);
    clearFormFields();
    toggleModal();

    axios.delete(`http://localhost:8000/events/${selectedEvent.id}`);
  };

  const clearFormFields = () => {
    setProduct("");
    setNote("");
    setCategory("");
  };

  const handleEditEvent = () => {
    const categoryColor = getCategoryColor(category_id);
    console.log(
      `Editing Event: categoryColor for categoryId ${category_id} is ${categoryColor}`
    );

    const updatedEvents = events.map((event) =>
      event.id === selectedEvent.id
        ? {
            ...event,
            productName: product,
            title: `${product} - ${note}`,
            categoryId: category_id,
            sellerId,
            categoryColor,
          }
        : event
    );
    setEvents(updatedEvents);
    toggleModal();
    clearFormFields();

    axios.put(`http://localhost:8000/events/${selectedEvent.id}`, {
      note,
      start: selectedEvent.start,
      productName: product,
      categoryId: category_id,
      sellerId,
    });
  };

  const handleFormSubmit = () => {
    const { start, end } = selectedSlot || {};
    const selectedProduct = products.find(
      (prod) => prod.product_id === product
    );
    const productId = selectedProduct ? selectedProduct.product_id : null;
    const categoryColor = getCategoryColor(category_id);

    console.log(
      `Creating Event: categoryColor for categoryId ${category_id} is ${categoryColor}`
    );

    if (selectedEvent) {
      handleEditEvent();
    } else {
      setSelectedEvent(null);
      const newEvent = {
        id: events.length + 1,
        title: `${product} - ${note}`,
        start,
        end,
        categoryId: category_id,
        sellerId,
        productId,
        categoryColor,
      };
      setEvents([...events, newEvent]);
      toggleModal();
      clearFormFields();

      axios
        .post("http://localhost:8000/events", {
          categoryId: category_id,
          productName: product,
          note,
          start,
          sellerId,
          productId,
          categoryColor,
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

  const getEventStyle = (event: any) => {
    return {
      style: {
        backgroundColor: event.categoryColor || "blue",
        color: "#FFF", // Text color for contrast
      },
    };
  };

  // Function to get category color based on category_id
  const getCategoryColor = (categoryId: string) => {
    const categoryColors: { [key: string]: string } = {
      "1": "green", // Category ID 1
      "2": "#FF5733", // Category ID 2
      "3": "#C4A484", // Category ID 3
      // Add more category_id and color mappings as needed
    };
    return categoryColors[categoryId] || "";
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
