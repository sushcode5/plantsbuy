import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";
import { ListGroup, Image, Button, Container, Row, Col } from "react-bootstrap";
export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };
  return (
    <Container>
      <Row className="cart-screen">
        <Col lg={8} md={12} sm={12} className="cart-box">
          <div>
            <div className="page-header">Shopping Cart </div>
            {cartItems.length === 0 ? (
              <MessageBox className="cart-shadow">
                Cart is empty. <Link to="/store">Go Shopping</Link>
              </MessageBox>
            ) : (
              <Row>
                <ListGroup as="ul">
                  {cartItems.map((item) => (
                    <ListGroup.Item as="li" className="cart-shadow">

                      <Row key={item.product}>
                        <Col lg={3} md={3} sm={3} xs={3}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            className="small"
                          />
                        </Col>
                        <Col lg={9} md={9} sm={9} xs={9} className="">
                          
                          <Row className="cart-items">
                          <Link className="item-name" to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                          </Row>
                        

                        <Row  className = "select cart-items">
                          
                         
                          <select
                            value={item.qty}
                            onChange={(e) =>
                              dispatch(
                                addToCart(item.product, Number(e.target.value))
                              )
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </select>
                          
                      
                        </Row>

                        <Row className = "cart-items item-price">Rs {item.price}</Row>
                    </Col>
                    </Row>

                    

                    <Row className = "cart-delete">
                      <div >
                      <Link
                            variant="danger"
                            onClick={() => removeFromCartHandler(item.product)}
                          >
                            Remove
                          </Link>
                      </div>     
                    </Row>

                     
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Row>
            )}
          </div>
          
          <br/>
          <Row>
            <Link to="/store">+ Add More Items</Link>
          </Row>
        </Col>
        <Col lg={4} md={12} sm={12} className="cart-box">
          <ListGroup>
            <ListGroup.Item>
              <h4>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : Rs{" "}
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h4>
            </ListGroup.Item>

            <ListGroup.Item>
              <Button
                variant="success"
                size="lg"
                block
                type="submit"
                onClick={checkoutHandler}
                target="_blank"
                className="button"
              >
                Proceed to checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}
