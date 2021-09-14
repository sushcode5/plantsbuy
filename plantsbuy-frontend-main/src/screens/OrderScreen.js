import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Axios from "axios";
import { Button, ListGroup, Container, Image, Row, Col } from "react-bootstrap";

export default function OrderScreen(props) {
  const orderId = props.match.params.id;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsOrder(orderId));
  }, [dispatch, orderId]);

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await Axios.post(`/api/orders/${order._id}/pay`, order);

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: process.env.RAZORPAY_CLIENT_ID, // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "PlantsBuy",
      description: "Thank you for shopping with us!",
      image: "",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await Axios.post(
          `/api/orders/${order._id}/pay/success`,
          data
        );

        if (result.data.order.isPaid) {
          window.location.reload();
        } else {
          alert("payment failed please try again");
        }
      },
      notes: {
        address: " Vyankatesh Nagar, Chikhli",
      },
      theme: {
        color: " #012652",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <Container  className = "orderScreen">
      <Container>
        <strong><h6>Order {order._id}</h6></strong>
      </Container>
      <Row>
       <Col lg={8} md={12} sm={12} xs={12}>
          <ListGroup as="ul">
            <ListGroup.Item as="li" className="cart-shadow">
              <h4>Shipping</h4>
              <p>
                <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                <strong>Address:</strong> {order.shippingAddress.address},
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                , {order.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item as="li"  className="cart-shadow">
              {order.isDelivered ? (
                <MessageBox variant="success">
                  Delivered at {order.deliveredAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger"> Not Delivered </MessageBox>
              )}
            </ListGroup.Item>

            <ListGroup.Item as="li"  className="cart-shadow">
              <h4>Payment</h4>
              <p>
                <strong>Method:</strong> {order.paymentMethod} <br />
              </p>
              {order.isPaid ? (
                <MessageBox variant="success">
                  Paid at {order.paidAt}
                  <br />
                  <br />
                  Order will be delivered in 5 working days.
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Not Paid</MessageBox>
              )}
            </ListGroup.Item>

            <ListGroup.Item as="li"  className="cart-shadow">
              <h4> Order Items</h4>

              <ListGroup as="ul">
                {order.orderItems.map((item) => (
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
                      <Col className = "placed-items" lg={4}  sm={4} md={4} xs={4}>
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
        <Col  lg={4} md={12} sm={12} xs={12}>
          <ListGroup as="ul" className="cart-shadow">
            <h4>Order Summery</h4>
            <ListGroup.Item as="li">
              <Row>
                <Col lg={7} md={7} sm={7} xs={7}>Items</Col>
                <Col>Rs {order.itemsPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item as="li">
              <Row>
                <Col lg={7} md={7} sm={7} xs={7}>Shipping</Col>
                <Col>Rs {order.shippingPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item as="li">
              <Row>
                <Col lg={7} md={7} sm={7} xs={7}> Tax </Col>
                <Col >Rs {order.taxPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item as="li">
              <Row>
                <Col lg={7} md={7} sm={7} xs={7}>
                  <strong>Order Total</strong>
                </Col>
                <Col>
                  <strong>Rs {order.totalPrice.toFixed(2)}</strong>
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item as="li">
              {order.isPaid ? (
                <MessageBox variant="success">Paid</MessageBox>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  block
                  type="submit"
                  onClick={displayRazorpay}
                  target="_blank"
                >
                  Pay
                </Button>
              )}
            </ListGroup.Item>
          </ListGroup>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox varient="danger">{error}</MessageBox>}
        </Col>
      </Row>
    </Container>
  );
}
