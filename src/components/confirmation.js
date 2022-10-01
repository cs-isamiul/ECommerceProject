import React from "react";

const orderInformation = {
  id: 43798,
  currency: "$",
  total: "$378.45",
  estimatedDeliveryDateMin: "October 2, 2022",
  estimatedDeliveryDateMax: "December 9, 2022",
}

function OrderConfirm() {
  return (
    <>
      <h1>Your Order Has Been Confirmed! Thank you for shopping at "Get Connected!"</h1>
      <h2>Your order id is: {orderInformation.id}</h2>
      <h2>Your order total is: {orderInformation.total}</h2>
      <h2>Your estimated deliver date as of now is: {orderInformation.estimatedDeliveryDateMin}-{orderInformation.estimatedDeliveryDateMax}</h2>
    </>
  );
}

export default OrderConfirm;