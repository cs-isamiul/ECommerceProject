import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Card from "react-bootstrap/Card";

const Phone = (props) => {
  const { phoneItem, addToCart } = props;
  const handleChange = (e) => {
    phoneItem.qty = e.target.value;
  };
  return (
    <article className="phone">
      <Card className="phone">
        <div className="card_img_container">
          <Card.Img
            variant="top"
            style={{
              height: "100%",
              width: "100%",
              objectFit: "contain",
              margin: "0.5rem",
            }}
            src={phoneItem.img}
            alt=""
          />
        </div>
        <Card.Body>
          <Card.Title
            as="h4"
            style={{
              color: "#617d98",
              fontSize: "1rem",
              marginTop: "0.25rem",
              fontWeight: "bold",
            }}
          >
            {phoneItem.brand} {phoneItem.model}
          </Card.Title>

          <Card.Text>Memory size: {phoneItem.memorySize}</Card.Text>
          <Card.Text>Screen size: {phoneItem.screenSize}</Card.Text>
          <Card.Text>Color: {phoneItem.color}</Card.Text>
          <Card.Text>Condition: {phoneItem.condition}</Card.Text>
          <Card.Text>Price: {phoneItem.price}</Card.Text>

          <InputGroup>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Quantity:</Form.Label>
              <Form.Control
                type="number"
                placeholder="#"
                min="1"
                max={Number.MAX_SAFE_INTEGER}
                size="sm"
                onChange={handleChange}
              />
            </Form.Group>
          </InputGroup>

          <Button
            size="sm"
            variant="dark"
            onClick={() => addToCart(phoneItem, phoneItem.qty)}
          >
            Add to cart
          </Button>
        </Card.Body>
      </Card>
    </article>
  );
};
export default Phone;
