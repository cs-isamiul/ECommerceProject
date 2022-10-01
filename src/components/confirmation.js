import React from "react";
import orderInformation from "../data/orderConfirmation.json"


function OrderConfirm() {
  const order = getOrderDetails(1);

  return (
    <>
      <h1>Your Order Has Been Confirmed! Thank you for shopping at "Get Connected!"</h1>
      <h2>Your order id is: {order.id}</h2>
      <h2>Your order total is: {order.currency}{order.total}</h2>
      <h2>Your estimated deliver date as of now is: {order.estimatedDeliveryDateMin}-{order.estimatedDeliveryDateMax}</h2>
    </>
  );
}

//Change this method once database is hooked in, or once we pass data from different components
function getOrderDetails(confirmationNumber) {
  return orderInformation[confirmationNumber];
}

export default OrderConfirm;