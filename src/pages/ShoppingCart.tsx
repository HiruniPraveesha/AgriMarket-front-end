import React, { useState, useEffect } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import Header from "../components/Header-main";
import Footer from "../components/Footer-main";
import Delete from "../assets/Delete.svg"; // Import the delete icon
import { useNavigate } from "react-router-dom";

interface Product {
  product_id: number;
  name: string;
  price: number;
  quantity: number;
}

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  //console.log(cartProducts);

  // Function to fetch cart products from session storage
  const fetchCartProducts = () => {
    try {
      const cartData = sessionStorage.getItem("cart");
      if (cartData) {
        const parsedCartData: Product[] = JSON.parse(cartData);

        setCartProducts(parsedCartData);
        calculateSubtotal(parsedCartData);
        setTotalItemsCount(
          parsedCartData.reduce((acc, product) => acc + product.quantity, 0)
        );
      } else {
        setCartProducts([]);
        setTotalItemsCount(0);
      }
    } catch (error) {
      console.error("Error fetching cart products:", error);
    }
  };

  const removeProductFromCart = (productId: number) => {
    try {
      let cart = JSON.parse(sessionStorage.getItem("cart") || "[]");
      const updatedCart = cart.filter(
        (product: Product) => product.product_id !== productId
      );

      sessionStorage.setItem("cart", JSON.stringify(updatedCart));
      setCartProducts([...updatedCart]); // Ensure immutability by spreading into a new array
      calculateSubtotal(updatedCart);

      // Explicitly specify types for acc and product
      setTotalItemsCount(
        updatedCart.reduce(
          (acc: number, product: Product) => acc + product.quantity,
          0
        )
      );
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  const updateProductQuantity = (productId: number, quantity: number) => {
    try {
      let cart = JSON.parse(sessionStorage.getItem("cart") || "[]");
      cart = cart.map((product: Product) => {
        if (product.product_id === productId) {
          return { ...product, quantity: quantity > 0 ? quantity : 1 };
        }
        return product;
      });
      sessionStorage.setItem("cart", JSON.stringify(cart));
      fetchCartProducts(); // Refresh cart products after quantity update
    } catch (error) {
      console.error("Error updating product quantity:", error); // Handle error
    }
  };

  // Calculate subtotal based on cart products
  const calculateSubtotal = (products: Product[]) => {
    let total = 0;
    products.forEach((product) => {
      total += product.price * product.quantity;
    });
    setSubtotal(total);
  };

  // Function to clear the shopping cart
  const clearCart = () => {
    try {
      sessionStorage.removeItem("cart");
      setCartProducts([]); // Clear cart products in state
      setSubtotal(0); // Reset subtotal
      setTotalItemsCount(0); // Reset total items count
    } catch (error) {
      console.error("Error clearing cart:", error); // Handle error
    }
  };

  // Fetch cart products on component mount
  useEffect(() => {
    fetchCartProducts();
  }, []); // Empty dependency array means this effect runs once after initial render

  return (
    <>
      <Header />
      <section className="h-100 h-custom" style={{ backgroundColor: "white" }}>
        <div className="py-5 h-100">
          <Row className="justify-content-center align-items-center h-100 w-100">
            <Col lg="8">
              <Card
                className="card-registration card-registration-2"
                style={{ border: "0px" }}
              >
                <Card.Body className="p-0">
                  <Row className="g-0">
                    <Col md="7" lg="7" xl="7">
                      <div className="p-1">
                        <div className="d-flex justify-content-between align-items-center mb-5">
                          <h2
                            className="mb-0 text-black"
                            style={{ fontWeight: "600", fontSize: "20px" }}
                          >
                            Shopping Cart
                          </h2>
                        </div>

                        <Row
                          className="mb-4 d-flex justify-content-between align-items-center"
                          style={{
                            fontSize: "12px",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            color: "gray",
                          }}
                        >
                          <Col md="5" lg="5" xl="5">
                            <h6 style={{ fontSize: "inherit" }}>Item</h6>
                          </Col>

                          <Col md="2" lg="2" xl="2">
                            <h6 style={{ fontSize: "inherit" }}>Price</h6>
                          </Col>

                          <Col
                            md="2"
                            lg="2"
                            xl="2"
                            className="d-flex align-items-center"
                          >
                            <h6 style={{ fontSize: "inherit" }}>Qty</h6>
                          </Col>

                          <Col md="2" lg="2" xl="2">
                            <h6 style={{ fontSize: "inherit" }}>Subtotal</h6>
                          </Col>

                          <Col md="1" lg="1" xl="1"></Col>
                        </Row>

                        <hr style={{ marginTop: "-15px" }} />

                        {/* Cart items */}
                        {cartProducts.map((product) => (
                          <div key={product.product_id}>
                            <Row className="mb-3 d-flex justify-content-between align-items-center">
                              <Col md="5" lg="5" xl="5">
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <img
                                    width="50"
                                    height="50"
                                    style={{
                                      marginRight: "15px",
                                      border: "2px solid #ccc",
                                    }}
                                  />
                                  <h6>{product.name}</h6>
                                </div>
                              </Col>
                              <Col md="2" lg="2" xl="2">
                                <h6>Rs.{product.price}</h6>
                              </Col>
                              <Col
                                md="2"
                                lg="2"
                                xl="2"
                                className="d-flex align-items-center"
                              >
                                <Form.Control
                                  type="number"
                                  value={product.quantity}
                                  onChange={(e) =>
                                    updateProductQuantity(
                                      product.product_id,
                                      parseInt(e.target.value)
                                    )
                                  }
                                  min="1"
                                  style={{ width: "60px" }}
                                />
                              </Col>
                              <Col md="2" lg="2" xl="2">
                                <h6>Rs.{product.price * product.quantity}</h6>
                              </Col>
                              <Col md="1" lg="1" xl="1">
                                <Button
                                  variant="link"
                                  size="sm"
                                  onClick={() =>
                                    removeProductFromCart(product.product_id)
                                  }
                                  style={{
                                    padding: 0,
                                    border: "none",
                                    background: "none",
                                  }}
                                >
                                  <img src={Delete} alt="Remove" width="20" />
                                </Button>
                              </Col>
                            </Row>
                          </div>
                        ))}

                        <div className="pt-5 d-flex justify-content-between">
                          <Button
                            variant="white"
                            style={{
                              borderRadius: "50px",
                              borderColor: "#01B928",
                              color: "white",
                              backgroundColor: "#01B928",
                            }}
                            className="btn-sm mx-2"
                          >
                            <i className="fas fa-long-arrow-alt-left me-2" />{" "}
                            Continue Shopping
                          </Button>

                          <Button
                            variant="white"
                            style={{
                              borderRadius: "50px",
                              borderColor: "#A2A6B0",
                              color: "#A2A6B0",
                            }}
                            className="btn-sm mx-2"
                            onClick={clearCart}
                          >
                            <i className="fas fa-long-arrow-alt-left me-2" />{" "}
                            Clear Shopping Cart
                          </Button>
                        </div>
                      </div>
                    </Col>

                    <Col lg="1"></Col>

                    <Col lg="4">
                      <div
                        className="p-4 bg-green"
                        style={{
                          background:
                            "linear-gradient(to right, #FFFFFF, #DFFFC0)",
                          border: "1px solid #01B928",
                        }}
                      >
                        <div className="d-flex justify-content-between">
                          <div>
                            <h5
                              className="mb-2"
                              style={{
                                fontSize: "15px",
                                color: "gray",
                                display: "inline",
                              }}
                            >
                              {totalItemsCount} items
                            </h5>
                          </div>
                          <div>
                            <h3>Rs.{subtotal}</h3>
                          </div>
                        </div>

                        <hr />

                        <h5 className="mb-2" style={{ fontSize: "13px" }}>
                          Enter promo code
                        </h5>

                        <div className="mb-3 d-flex align-items-center">
                          <Form.Control
                            size="sm"
                            style={{
                              width: "150px",
                              fontSize: "15px",
                              marginRight: "15px",
                            }}
                          />
                          <Button
                            variant="primary"
                            size="sm"
                            style={{
                              padding: "0.2rem 0.8rem",
                              fontSize: "12px",
                              backgroundColor: "#01B928",
                            }}
                          >
                            Apply
                          </Button>
                        </div>

                        <hr style={{ marginTop: "30px" }} />

                        <div className="d-flex justify-content-between mb-2">
                          <h5 style={{ fontSize: "15px" }}>Sub-total</h5>
                          <h5 style={{ fontSize: "15px" }}>Rs.{subtotal}</h5>
                        </div>

                        <div className="d-flex justify-content-between mb-2">
                          <h5 style={{ fontSize: "12px" }}>
                            Promo code discount
                          </h5>
                          <h5 style={{ fontSize: "12px" }}>-Rs.00</h5>
                        </div>

                        <div className="d-flex justify-content-between mb-2">
                          <h5 style={{ fontSize: "12px" }}>Order total</h5>
                          <h5 style={{ fontSize: "12px" }}>Rs.{subtotal}</h5>
                        </div>

                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Button
                            style={{
                              width: "200px",
                              height: "40px",
                              fontSize: "15px",
                              backgroundColor: "#01B928",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginTop: "15px",
                            }}
                            onClick={() => navigate("/checkout")}
                            disabled={totalItemsCount === 0} // Disable button if no items in cart
                          >
                            Proceed to Checkout
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ShoppingCart;
