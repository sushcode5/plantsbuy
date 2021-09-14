import React, { useEffect } from "react";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import CarouselContainer from "../components/CarouselContainer";
import FooterContainer from "../components/FooterContainer"
import { ListGroup, Container, Row, Col } from "react-bootstrap";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <Container fluid>
      {loading ? (
        <LoadingBox> </LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error} </MessageBox>
      ) : (
        <Container fluid>
          <CarouselContainer></CarouselContainer>
          <ListGroup className="info">
            <ListGroup.Item>Featured Products</ListGroup.Item>
            <ListGroup.Item>
              You always wanted to have some plants keep you company inside your
              house but never knew from where to start as you always thought as
              most plants require sun and outdoor environment, finding the
              correct ones for your space will be a challenge. Phew. Right? You
              are at the right place as PlantsBuy has solved this problem for
              you. In this Indoor Garden category, you will find plants and
              plant packs that are perfect for you to begin your journey of
              indoor gardening.
            </ListGroup.Item>
          </ListGroup>
          <Container>
            <Row>
              <Col lg={3} md={6} sm={6} xs={6} >
                <Product key={products[3]._id} product={products[3]}></Product>
              </Col>
              <Col lg={3} md={6} sm={6} xs={6}>
                <Product key={products[2]._id} product={products[2]}></Product>
              </Col>
              <Col lg={3} md={6} sm={6} xs={6}>
                <Product key={products[5]._id} product={products[5]}></Product>
              </Col>
              <Col lg={3} md={6} sm={6} xs={6}>
                <Product key={products[1]._id} product={products[1]}></Product>
              </Col>
            </Row>
          </Container>
          <FooterContainer></FooterContainer>
        </Container>
      )}
    </Container>
  );
}
