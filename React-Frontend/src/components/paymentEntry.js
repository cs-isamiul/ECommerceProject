import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
// import StandardNavbar from "./standardNavbar";

export default function Payment() {
  const location = useLocation();

  const [payState, setPayState] = useState({
    paymentFirstName: "",
    paymentLastName: "",
    paymentCardNum: "",
    paymentCardCVC: "",
    paymentCardYear: "",
    paymentCardMonth: "",
  });

  //const cart = location.state.cart;

  const onChange = (e) => {
    /*
      used to set state of 

      paymentFirstName
      paymentLastName
      paymentCardNum
      paymentCardCVC
      paymentCardYear
      paymentCardMonth
    */
    const { name, value } = e.target;
    setPayState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    navigate("/cart/shipping", {
      state: { cart: location.state.cart, payState: payState },
    });
    //     navigate("/cart/shipping", {state:{payState: payState, cart: cart}});
  };

  return (
    <>
      <div>
        <Form onSubmit={handleSubmit}>
          <h1>Payment Information</h1>

          <Col xs={4}>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                className="paymentEntry-font"
                type="text"
                name="paymentFirstName"
                placeholder="First Name"
                onChange={onChange}
              />
            </Form.Group>
          </Col>

          <Col xs={4}>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                className="paymentEntry-font"
                type="text"
                name="paymentLastName"
                placeholder="Last Name"
                onChange={onChange}
              />
            </Form.Group>
          </Col>

          <Col xs={4}>
            <Form.Group>
              <Form.Label>Credit Card Number</Form.Label>
              <Form.Control
                className="paymentEntry-font"
                type="text"
                name="paymentCardNum"
                placeholder="xxxx-xxxx-xxxx-xxxx"
                onChange={onChange}
              />
            </Form.Group>
          </Col>

          <Col xs={4}>
            <Form.Group>
              <Form.Label>Card CVC</Form.Label>
              <Form.Control
                className="paymentEntry-font"
                type="text"
                name="paymentCardCVC"
                placeholder="xxx"
                onChange={onChange}
              />
            </Form.Group>
          </Col>

          <Col xs={4}>
            <Form.Group>
              <Form.Label>Card Expire Year</Form.Label>
              <Form.Control
                className="paymentEntry-font"
                type="text"
                name="paymentCardYear"
                placeholder="xxxx (1950-2030)"
                onChange={onChange}
              />
            </Form.Group>
          </Col>

          <Col xs={4}>
            <Form.Group>
              <Form.Label>Card Expire Month</Form.Label>
              <Form.Control
                className="paymentEntry-font"
                type="text"
                name="paymentCardMonth"
                placeholder="01-12"
                onChange={onChange}
              />
            </Form.Group>
          </Col>

          <button>Pay</button>
        </Form>
      </div>
    </>
  );

  //TODO: develop entry for the collection of billing inFormation before placing an order.
}
