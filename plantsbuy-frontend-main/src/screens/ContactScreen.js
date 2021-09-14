import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
export default function ContactScreen() {
  return (
    <Container fluid>
      <Row className="cart-shadow">
        <ListGroup>
          <ListGroup.Item>
            <h4>Contact us</h4>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>Email: sushilrindhe29@gmail.com</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>Mobile: 8721097551</ListGroup.Item>
          <ListGroup.Item>
            Address: Vynakatesh nagar, chikhli, 443201, Maharashtra, India
          </ListGroup.Item>
        </ListGroup>
      </Row>
    </Container>
  );
}
