import { BsCartFill } from "react-icons/bs";
import ItemsCount from "./itemsCount";
import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";
import CartItem from "./CartItem";

export default function Cart() {
  const location = useLocation();
  const [cart, setCart] = useState(location.state.cart);

  const deleteFromCart = (phoneItem) => {
    setCart(
      cart => cart.filter(phone => {return phone.id !== phoneItem})
    )
  };

  //navigate to 'cart/purchase' and pass cart content.
  const navigate = useNavigate();
  const handleCart = () => {
    navigate("/cart", { state: { cart: cart } });
  };
  const handleCheckout = () => {
    navigate("/cart/purchase", { state: { cart: cart } });
  };

  return (
    <div className="shop">
      <Navbar bg="light" expand="lg" sticky="top">
        <Container fluid>
          <Navbar.Brand href="#">E-shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link to="/" className="nav-link">
                Home
              </Link>

              <Link to="/catalog" className="nav-link">
                Shop
              </Link>

              <Nav.Link href="#" disabled>
                About
              </Nav.Link>
            </Nav>
            <Button variant="outline-dark" onClick={handleCart}>
              <BsCartFill style={{ verticalAlign: "sub" }} /> Cart
              <Badge pill bg="dark" style={{ marginLeft: ".2rem" }}>
                <ItemsCount cart={cart} />
              </Badge>
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <h1>Your Cart</h1>

      {cart.length > 0 ?           
          <React.Fragment>
            <Button variant="outline-dark" onClick={handleCheckout}>
              Proceed to Checkout
              <Badge pill bg="dark" style={{ marginLeft: ".2rem" }}>
              </Badge>
            </Button>
            <section className="shoplist">
              {cart.map((cart) => {
                return ( 
                  <CartItem key={cart.id} phoneItem={cart} deleteFromCart={deleteFromCart}></CartItem>
                );
              })}
            </section>
          </React.Fragment> : <h3>Cart is empty!</h3>
      }
    </div>
  );
}
