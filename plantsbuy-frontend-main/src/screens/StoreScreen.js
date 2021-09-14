import React, { useEffect } from "react";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { Container, Row, Col, ListGroup } from "react-bootstrap";

export default function StoreScreen() {
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
        <Container>
          <ListGroup className="info">
            <ListGroup.Item>Indoor Plants</ListGroup.Item>
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
          <Row>
            {products.map((product) => (
              <Col lg={3} md={4} sm={6} xs={6}>
                <Product key={product._id} product={product}></Product>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </Container>
  );
}
