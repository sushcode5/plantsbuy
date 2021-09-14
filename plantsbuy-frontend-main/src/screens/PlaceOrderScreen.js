import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Button, ListGroup, Container, Row, Image, Col } from "react-bootstrap";

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  useEffect(() => {
    if (success) {
      props.history.push(`order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);
  return (
    <Container className= "placeOrderScreen">
      <Row>
        <Col lg={8} md={12} sm={12} xs={12}>
          <ListGroup as="ul">
            <ListGroup.Item as="li" className="cart-shadow">
              <h4>Shipping</h4>
              <p>
                <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                <strong>Address:</strong> {cart.shippingAddress.address},
                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="cart-shadow">
              <h4>Payment</h4>
              <p>
                <strong>Method:</strong> {cart.paymentMethod} <br />
              </p>
            </ListGroup.Item>

            <ListGroup.Item as="li" className="cart-shadow">
              <h4> Order Items</h4>

              <ListGroup as="ul">
                {cart.cartItems.map((item) => (
                  <ListGroup.Item as="li">
                    <Row>
                      <Col lg={3} sm={3} md={3} xs={3}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          className="small"
                        ></Image>
                      </Col>
                      <Col className = "placed-items" lg={5}  sm={5} md={5} xs={5}>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col  className = "placed-items" lg={4}  sm={4} md={4} xs={4}>
                        {item.qty} x Rs{item.price} = Rs
                        {item.qty * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>


        <Col lg={4} md={12} sm={12} xs={12}>
          <ListGroup as="ul" className="cart-shadow">
            <h4>Order Summery</h4>
            <ListGroup.Item as="li">
              <Row>
                <Col lg={7} md={7} sm={7} xs={7}>Items</Col>
                <Col>Rs {cart.itemsPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item as="li">
              <Row>
                <Col lg={7} md={7} sm={7} xs={7}>Shipping</Col>
                <Col>Rs {cart.shippingPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item as="li">
              <Row>
                <Col lg={7} md={7} sm={7} xs={7} > Tax </Col>
                <Col>Rs {cart.taxPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item as="li">
              <Row>
                <Col lg={7} md={7} sm={7} xs={7} >
                  <strong>Order Total</strong>
                </Col>
                <Col>
                  <strong>Rs {cart.totalPrice.toFixed(2)}</strong>
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item as="li">
              <Button
                variant="success"
                size="lg"
                onClick={placeOrderHandler}
                type="submit"
                disabled={cart.cartItems.length === 0}
                block
              >
                Place Order
              </Button>
            </ListGroup.Item>
          </ListGroup>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox varient="danger">{error}</MessageBox>}
        </Col>
      </Row>
    </Container>
  );
}
