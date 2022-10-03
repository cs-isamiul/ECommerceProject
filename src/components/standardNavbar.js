import { BsCartFill } from "react-icons/bs";
import { phones } from "./data/phones";
import FormattedPhoneData from "./ProcessPhone";
import ItemsCount from "./itemsCount";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";

function StandardNavbar(){

    const location = useLocation();

    const [cart, setCart] = useState([]);

    useEffect(()=>{
        try {
            setCart(location.state.cart);
        } catch (error) {
            console.log("No Previous Cart");
        }
    }, []);
    
    const navigate = useNavigate();
    
    const handleCart = () => {
        navigate("/cart", { state: { cart: cart } });
      };

    return <>
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
    </>
}

export default StandardNavbar;