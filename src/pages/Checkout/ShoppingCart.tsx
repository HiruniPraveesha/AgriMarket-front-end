import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainHeader from '../../components/Header-main';
import MainFooter from '../../components/Footer-main';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CartItem from '../Checkout/cart-row'; 


interface CartItemType {
    qty: number;
    product: {
        id: number;
        name: string;
        price: number;
        seller: {
            store_name: string;
        };
    };
}

const ShoppingCart = () => {
    const buyerId = 1; 
    
    const [loading, setLoading] = useState(false);
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);
    const [totalItemsCount, setTotalItemsCount] = useState<number>(0);
    const [subtotal, setSubtotal] = useState<number>(0);
    const navigate = useNavigate();

    // Function to fetch shopping cart items
    const fetchShoppingCart = async () => {
        try {
            setLoading(true);
            const url = `http://localhost:8000/show-cart`;
            const response = await axios.get(url, { params: { buyerId } });

            const cartItems: CartItemType[] = response.data.data;

            setCartItems(cartItems);

            const totalCount = cartItems.reduce((total, item) => total + item.qty, 0);
            setTotalItemsCount(totalCount);

            const newSubtotal = cartItems.reduce((total, item) => total + item.qty * item.product.price, 0);
            setSubtotal(newSubtotal);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching shopping cart:', error);
            setLoading(false);
        }
    };

    // Function to handle quantity change in cart item
    const handleQtyChange = (index: number, newQty: number) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].qty = newQty;

        setCartItems(updatedCartItems);

        const totalCount = updatedCartItems.reduce((total, item) => total + item.qty, 0);
        setTotalItemsCount(totalCount);

        const newSubtotal = updatedCartItems.reduce((total, item) => total + item.qty * item.product.price, 0);
        setSubtotal(newSubtotal);
    };

    // Function to handle item deletion in cart
    const handleDelete = async (index: number) => {
        const productId = cartItems[index].product.id;
        try {
            await axios.post('http://localhost:8000/remove-product-from-cart', {
                buyerId,
                productId
            });

            const updatedCartItems = [...cartItems];
            updatedCartItems.splice(index, 1);

            setCartItems(updatedCartItems);

            const totalCount = updatedCartItems.reduce((total, item) => total + item.qty, 0);
            setTotalItemsCount(totalCount);

            const newSubtotal = updatedCartItems.reduce((total, item) => total + item.qty * item.product.price, 0);
            setSubtotal(newSubtotal);
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    };

    const clearCart = async () => {
        try {
            await axios.post('http://localhost:8000/clear-cart', {
                buyerId
            });

            setCartItems([]);
            setTotalItemsCount(0);
            setSubtotal(0);
        } catch (error) {
            console.error('Error clearing shopping cart:', error);
        }
    };

    useEffect(() => {
        fetchShoppingCart();
    }, []);

    return (
        <>
            <MainHeader />
            <section className="h-100 h-custom" style={{ backgroundColor: 'white' }}>
                <div className="py-5 h-100">
                    <Row className="justify-content-center align-items-center h-100 w-100">
                        <Col lg="8">
                            <Card className="card-registration card-registration-2" style={{ border: '0px' }}>
                                <Card.Body className="p-0">
                                    <Row className="g-0">
                                        <Col md="7" lg="7" xl="7">
                                            <div className="p-1">
                                                <div className="d-flex justify-content-between align-items-center mb-5">
                                                    <h2 className="mb-0 text-black" style={{ fontWeight: '600', fontSize: '20px' }}>
                                                        Shopping Cart
                                                    </h2>
                                                </div>

                                                <Row className="mb-4 d-flex justify-content-between align-items-center"
                                                    style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: 'gray' }}>

                                                    <Col md="5" lg="5" xl="5">
                                                        <h6 style={{ fontSize: 'inherit' }}>
                                                            Item
                                                        </h6>
                                                    </Col>

                                                    <Col md="2" lg="2" xl="2">
                                                        <h6 style={{ fontSize: 'inherit' }}>
                                                            Price
                                                        </h6>
                                                    </Col>

                                                    <Col md="2" lg="2" xl="2" className="d-flex align-items-center">
                                                        <h6 style={{ fontSize: 'inherit' }}>
                                                            Qty
                                                        </h6>
                                                    </Col>

                                                    <Col md="2" lg="2" xl="2">
                                                        <h6 style={{ fontSize: 'inherit' }}>
                                                            Subtotal
                                                        </h6>
                                                    </Col>

                                                    <Col md="1" lg="1" xl="1">
                                                    </Col>
                                                </Row>

                                                <hr style={{ marginTop: '-15px' }} />

                                                {/* Cart items */}
                                                <div>
                                                    {loading ? (
                                                        <p>Loading...</p>
                                                    ) : (
                                                        cartItems.map((item, index) => (
                                                            <CartItem
                                                                key={index}
                                                                name={item.product.name}
                                                                price={item.product.price}
                                                                image="path/to/image.jpg" // Replace with actual image path if available
                                                                store_name={item.product.seller.store_name}
                                                                qty={item.qty}
                                                                onQtyChange={(newQty: number) => handleQtyChange(index, newQty)}
                                                                onDelete={() => handleDelete(index)}
                                                                productId={item.product.id}
                                                                buyerId={buyerId}
                                                                quantityLimit={10} // Example limit, replace with actual value if available
                                                            />
                                                        ))
                                                    )}
                                                </div>

                                                <hr style={{ marginBottom: '-20px' }} />

                                                <div className="pt-5 d-flex justify-content-between">
                                                    <Button variant="white" style={{
                                                        borderRadius: '50px',
                                                        borderColor: '#01B928',
                                                        color: 'white',
                                                        backgroundColor: '#01B928'
                                                    }} className="btn-sm mx-2">
                                                        <i className="fas fa-long-arrow-alt-left me-2" /> Continue Shopping
                                                    </Button>

                                                    <Button variant="white"
                                                        style={{
                                                            borderRadius: '50px',
                                                            borderColor: '#A2A6B0',
                                                            color: '#A2A6B0'
                                                        }} className="btn-sm mx-2">
                                                        <i className="fas fa-long-arrow-alt-left me-2" /> Clear Shopping Cart
                                                    </Button>
                                                </div>

                                            </div>
                                        </Col>

                                        <Col lg="1"></Col>

                                        <Col lg="4">
                                            <div className="p-4 bg-green" style={{ background: 'linear-gradient(to right, #FFFFFF, #DFFFC0)', border: '1px solid #01B928' }}>
                                                <div className="d-flex justify-content-between">
                                                    <div>
                                                        <h5 className="mb-2" style={{ fontSize: '15px', color: 'gray', display: 'inline' }}>
                                                            {totalItemsCount} items
                                                        </h5>
                                                    </div>
                                                    <div>
                                                        <h3>Rs.{subtotal}</h3>
                                                    </div>
                                                </div>

                                                <hr />

                                                <h5 className="mb-2" style={{ fontSize: '13px' }}>
                                                    Enter promo code
                                                </h5>

                                                <div className="mb-3 d-flex align-items-center">
                                                    <Form.Control size="sm" style={{ width: '150px', fontSize: '15px', marginRight: '15px' }} />
                                                    <Button variant="primary" size="sm" style={{ padding: '0.2rem 0.8rem', fontSize: '12px', backgroundColor: '#01B928' }}>
                                                        Apply
                                                    </Button>
                                                </div>

                                                <hr style={{ marginTop: '30px' }} />

                                                <div className="d-flex justify-content-between mb-2">
                                                    <h5 style={{ fontSize: '15px' }}>
                                                        Sub-total
                                                    </h5>
                                                    <h5 style={{ fontSize: '15px' }}>Rs.{subtotal}</h5>
                                                </div>

                                                <div className="d-flex justify-content-between mb-2">
                                                    <h5 style={{ fontSize: '12px' }}>
                                                        Promo code discount
                                                    </h5>
                                                    <h5 style={{ fontSize: '12px' }}>-Rs.00</h5>
                                                </div>

                                                <div className="d-flex justify-content-between mb-2">
                                                    <h5 style={{ fontSize: '12px' }}>
                                                        Order total
                                                    </h5>
                                                    <h5 style={{ fontSize: '12px' }}>Rs.{subtotal}</h5>
                                                </div>


                                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <Button style={{
                                                        width: '200px', height: '40px', fontSize: '15px',
                                                        backgroundColor: '#01B928', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        marginTop: '15px'
                                                    }} onClick={() => navigate('/checkout')}>
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
            <MainFooter />
        </>
    );
}

export default ShoppingCart;
