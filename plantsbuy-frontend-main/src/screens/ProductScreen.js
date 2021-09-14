import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { Button, Image, ListGroup, Container, Row, Col } from "react-bootstrap";

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Container className="product-screen">
          <Row>
            <Col className="product-box" lg={4} md={12} sm={12} xs={12}>
              <Image className="large" src={product.image} alt={product.name} />
            </Col>
            <Col className="product-box" lg={4} md={12} sm={12} xs={12}>
              <ListGroup>
                <ListGroup.Item>
                  <div className="product-name">{product.name}</div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                </ListGroup.Item>
                <ListGroup.Item className="price" >Price : Rs {product.price}</ListGroup.Item>
                <ListGroup.Item>
                  <p> Description: {product.description}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col className="product-box" lg={4} md={12} sm={12} xs={12}>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col lg={8} md={8} sm={8}>
                      Price
                    </Col>
                    <Col lg={4} md={4} sm={4}>
                      Rs {product.price}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col lg={8} md={8} sm={8}>
                      {" "}
                      Status
                    </Col>
                    <Col lg={4} md={4} sm={4}>
                      {product.countInStock > 0 ? (
                        <span className="success">In Stock</span>
                      ) : (
                        <span className="danger">Unavailable</span>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  {product.countInStock > 0 && (
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  {product.countInStock > 0 && (
                    <Button
                      variant="success"
                      size="lg"
                      block
                      type="submit"
                      onClick={addToCartHandler}
                      target="_blank"
                    >
                      Add to cart
                    </Button>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}
