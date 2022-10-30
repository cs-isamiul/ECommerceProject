import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
// import StandardNavbar from "./standardNavbar";

export default function Shipping() {
  const [shipState, shipSetState] = useState({
    shippingFirstName: "",
    shippingLastName: "",
    shippingPhoneNumber: "",
    shippingAddressOne: "",
    shippingAddressTwo: "",
    shippingCity: "",
    shippingState: "",
    shippingZip: "",
  });

  const location = useLocation();
  // const getfromPayState = useState(location.state.payState);
  // console.log(getfromPayState);

  const onChange = (e) => {
    /*
      used to set state of 

      shippingFirstName
      shippingLastName
      shippingPhoneNumber
    */
    const { name, value } = e.target;
    shipSetState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    console.log(
      "line 40 shipping: " + location.state.payState.paymentFirstName
    );
    navigate("/cart/review", {
      state: {
        payState: location.state.payState,
        shipState: shipState,
      },
    });
  };

  return (
    <>
      <div>
        <Form onSubmit={handleSubmit}>
          <h1>Shipping Information</h1>

          <Col xs={4}>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                className="shippingEntey-font"
                type="text"
                name="shippingFirstName"
                placeholder="First Name"
                autoComplete={false}
                onChange={onChange}
              />
            </Form.Group>
          </Col>

          <Col xs={4}>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                className="shippingEntey-font"
                type="text"
                name="shippingLastName"
                placeholder="Last Name"
                autoComplete={false}
                onChange={onChange}
              />
            </Form.Group>
          </Col>

          <Col xs={4}>
            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                className="shippingEntey-font"
                type="text"
                name="shippingPhoneNumber"
                placeholder="*** - *** ****"
                autoComplete={false}
                onChange={onChange}
              />
            </Form.Group>
          </Col>

          <Col xs={4}>
            <Form.Group>
              <Form.Label>Address 1</Form.Label>
              <Form.Control
                className="shippingEntey-font"
                type="text"
                name="shippingAddressOne"
                placeholder="Address 1"
                autoComplete={false}
                onChange={onChange}
              />
            </Form.Group>
          </Col>

          <Col xs={4}>
            <Form.Group>
              <Form.Label>Address 2</Form.Label>
              <Form.Control
                className="shippingEntey-font"
                type="text"
                name="shippingAddressTwo"
                placeholder="Address 2"
                autoComplete={false}
                onChange={onChange}
              />
            </Form.Group>
          </Col>

          <Col xs={4}>
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control
                className="shippingEntey-font"
                type="text"
                name="shippingCity"
                placeholder="City"
                autoComplete={false}
                onChange={onChange}
              />
            </Form.Group>
          </Col>

          <Col xs={4}>
            <Form.Group>
              <Form.Label>State</Form.Label>
              <Form.Control
                className="shippingEntey-font"
                type="text"
                name="shippingState"
                placeholder="State"
                autoComplete={false}
                onChange={onChange}
              />
            </Form.Group>
          </Col>

          <Col xs={4}>
            <Form.Group>
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                className="shippingEntey-font"
                type="text"
                name="shippingZip"
                placeholder="Zip Code"
                autoComplete={false}
                onChange={onChange}
              />
            </Form.Group>
          </Col>

          <button>Place Order</button>
        </Form>
      </div>
    </>
  );

  //TODO: develop entry for the collection of shipping information before placing an order.
}

//alert or consol log
