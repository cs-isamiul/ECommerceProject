import React from "react";
import { useLocation } from "react-router-dom";

export default function ShoppingCart() {
  const location = useLocation();
  return (
    <>
      <div>
        <h2>Shopping Cart</h2>;{" "}
      </div>
      {console.log(location.state.cart)}
    </>
  );
  //TODO: add interface + features for the shopping cart.
}
