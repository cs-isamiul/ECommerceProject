import { BsCartFill } from "react-icons/bs";
import { phones } from "./data/phones";
import FormattedPhoneData from "./ProcessPhone";
import ItemsCount from "./itemsCount";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";

export default function Shop(props) {
  const { cart, setCart } = props;
  console.log(cart);
  const addToCart = (phoneItem, qty) => {
    const cartItem = cart.find((x) => x.id === phoneItem.id);
    //if phoneItem is already in cart, simply increase its count.
    if (qty) {
      qty = parseInt(qty);
      if (cartItem) {
        console.log("item count in cart:");
        console.log(qty + cartItem.count);
        setCart(
          //locate existing item and icrease count. Ensure users don't overflow cart.
          cart.map((x) =>
            x.id === phoneItem.id
              ? {
                  ...cartItem,
                  count: Number.isSafeInteger(cartItem.count + qty)
                    ? cartItem.count + qty
                    : cartItem.count,
                }
              : x
          )
        );
        console.log(
          "Updated product count for: " +
            phoneItem.brand +
            " " +
            phoneItem.model
        );
      } else {
        setCart([...cart, { ...phoneItem, count: qty }]);
        console.log(
          "Added " +
            phoneItem.brand +
            " " +
            phoneItem.model +
            " for the first time."
        );
        console.log("Items added:");
        console.log(qty);
      }
    }
  };
  //navigate to 'cart' and pass cart content.
  const navigate = useNavigate();
  const handleCart = () => {
    navigate("/cart", { state: { cart: cart } });
  };
  //console.log("cart:", cart);
  return (
    <div className="shop">
      <h1>Item Catalog</h1>

      <section className="shoplist">
        {phones.map((phone) => {
          return (
            <FormattedPhoneData
              key={phone.id}
              phoneItem={phone}
              addToCart={addToCart}
            ></FormattedPhoneData>
          );
        })}
      </section>
    </div>
  );
}
