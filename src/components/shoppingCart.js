import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import CartItem from "./CartItem";
import StandardNavbar from "./standardNavbar"

export default function Cart() {
  const location = useLocation();
  const [cart, setCart] = useState(location.state.cart);
  const navigate = useNavigate();

  const deleteFromCart = (phoneItem) => {
    setCart(cart => cart.filter(phone => {return phone.id !== phoneItem}))
  };
  const handleCheckout = () => {
    navigate("/cart/purchase", { state: { cart: cart } });
  };

  return (
    <div className="shop">
      <StandardNavbar />
      <h1>Your Cart</h1>
      {cart.length > 0 ? ProceedToCheckoutButton() : <h3>Cart is empty!</h3>}
    </div>
  );

  function ProceedToCheckoutButton() {
    return (
      <React.Fragment>
        <Button variant="outline-dark" onClick={handleCheckout}>
          Proceed to Checkout
          <Badge pill bg="dark" style={{ marginLeft: ".2rem" }} />
        </Button>
        <section className="shoplist">
          {cart.map((cart) => {
            return <CartItem key={cart.id} phoneItem={cart} deleteFromCart={deleteFromCart}></CartItem>;
          })}
        </section>
      </React.Fragment>
    );
  }
}
