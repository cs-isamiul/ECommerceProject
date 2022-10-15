import React from "react";
import { useLocation } from "react-router-dom";
import { GenerateInfoHeader, GenereateItemInfo } from "./orderSummaryGenerator";
// import StandardNavbar from "./standardNavbar";
import "../style.css";

function OrderConfirm() {
  const location = useLocation();

  try {
    const order = location.state.cart;
    let paymentInfo = { paymentFirstName: "Someone", paymentLastName: "Cool" };
    let shipmentInfo = {
      shippingFirstName: "Someone",
      paymentLastName: "Cool",
    };

    //temp solution
    try {
      paymentInfo = location.state.payState;
      shipmentInfo = location.state.shipState;

      if (paymentInfo.paymentFirstName.length == 0) {
        paymentInfo = { paymentFirstName: "Someone", paymentLastName: "Cool" };
      }

      if (shipmentInfo.shippingFirstName.length == 0) {
        shipmentInfo = {
          shippingFirstName: "Someone",
          paymentLastName: "Cool",
        };
      }
    } catch (error) {
      console.log("error");
    }

    return (
      <>
        <div className="center">
          <h1>
            Your Order Has Been Confirmed!
            <br />
            Thank you for shopping at "Get Connected!"
          </h1>
          <GenerateInfoHeader order={paymentInfo} />
        </div>

        <section className="shoplist">
          {order.map((phone, index) => {
            return <GenereateItemInfo key={index} item={phone} />;
          })}
        </section>
      </>
    );
  } catch (error) {
    return (
      <>
        <h1>
          Uh oh, I'm sorry but it looks like you don't have an order confirmed!
        </h1>
      </>
    );
  }
}

export default OrderConfirm;
