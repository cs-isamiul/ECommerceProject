import React from "react";
import { useLocation } from "react-router-dom";
import { GenerateInfoHeader, GenereateItemInfo } from "./orderSummaryGenerator"
import StandardNavbar from "./standardNavbar";
import "../style.css"

function OrderConfirm() {
  const location = useLocation();

  try {
    const order = location.state.cart;

    return (
      <>
        <div className="shop">
          <StandardNavbar />
        </div>

        <div className="center">
          <h1>Your Order Has Been Confirmed!<br/>Thank you for shopping at "Get Connected!"</h1>
          <GenerateInfoHeader order={order} />
        </div>

        <section className="shoplist">
          {order.map((phone, index) => {
            return <GenereateItemInfo key={index} item={phone} />;
          })}
        </section>
      </>
    );
  } catch (error) {
    return <>
      <h1>Uh oh, I'm sorry but it looks like you don't have an order confirmed!</h1>
    </>
  }

}

export default OrderConfirm;