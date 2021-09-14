import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
const FooterContainer = () => {
  return (
    <Container fluid className="footer">
      <Row>
        <Col lg={3} sm={3} xs={3} className=" footer-info">
          {" "}
          <Link className="footer-link" to="/privacypolicy">
            Privacy Policy
          </Link>
        </Col>

        <Col lg={3} sm={3} xs={3} className=" footer-info">
          {" "}
          <Link className="footer-link" to="/refundpolicy">
            Refund Policy
          </Link>
        </Col>
        <Col lg={3} sm={3} xs={3} className=" footer-info">
          {" "}
          <Link className="footer-link" to="/shippingpolicy">
            Shipping Policy
          </Link>
        </Col>
        <Col lg={3} sm={3} xs={3} className=" footer-info">
          <Link className="footer-link" to="/termsofservices">
            Terms of Service
          </Link>
        </Col>
      </Row>
      <Row>
        <div className="footer-icons justify-content-center d-flex flex-row">
          <div className="social-link">
            <a
              className="footer-link"
              href="https://www.linkedin.com/in/sushil-rindhe-b88654169/"
            >
              <i class="fab fa-facebook fa-lg "></i>
            </a>
          </div>
          <div className="social-link">
            <a
              className="footer-link"
              href="https://www.linkedin.com/in/sushil-rindhe-b88654169/"
            >
              <i class="fab fa-instagram fa-lg"></i>
            </a>
          </div>
          <div className="social-link">
            <a
              className="footer-link"
              href="https://www.linkedin.com/in/sushil-rindhe-b88654169/"
            >
              <i class="fab fa-linkedin fa-lg"></i>
            </a>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default FooterContainer;
