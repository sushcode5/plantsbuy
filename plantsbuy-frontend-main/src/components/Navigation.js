import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../actions/userActions";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Container,
} from "react-bootstrap";

export default function Navigation() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <Container fluid>
      <Navbar className="color-navbar" bg="dark" variant="dark" expand="lg">
        <Navbar.Brand className="nav-brand" href="/">
          PlantsBuy
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/"> Home</Nav.Link>
            <Nav.Link as={Link} to="/store">
              Store
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
              <i class="fa fa-shopping-cart fa-lg"></i>
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact us
            </Nav.Link>

            {userInfo ? (
              <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/orderhistory">
                  Order History
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  as={Link}
                  to="/signout"
                  onClick={signoutHandler}
                >
                  Sign out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to="/signin">
                Sign in
              </Nav.Link>
            )}

            {userInfo && userInfo.isAdmin && (
              <NavDropdown title="Admin" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/dashboard">
                  Dashboard
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/productlist">
                  Products
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/orderlist">
                  Orders
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/userlist">
                  Users
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}
