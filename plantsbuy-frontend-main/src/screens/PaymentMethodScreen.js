import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function PaymentMethodScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("Razorpay");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };
  return (
    <Container
      style={{
        margin: "3rem",
      }}
    >
      <form className="form" onSubmit={submitHandler}>
        <Row className="cart-shadow">
          <Col lg={12} xs={12}>
            <h3>Payment Method</h3>
          </Col>
          <Col lg={12} xs={12}>
            <input
              type="radio"
              id="razorpay"
              value="razorpay"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>

            <label htmlFor="razorpay">
              <strong>
                <h5>Razorpay</h5>
              </strong>
            </label>
          </Col>

          <Col lg={12} xs={12}>
            <label />
            <Button variant="success" className="primary" type="submit">
              Continue
            </Button>
          </Col>
        </Row>
      </form>
    </Container>
  );
}
