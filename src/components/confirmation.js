import React from "react";
import orderInformation from "../data/orderConfirmation.json"
import {useLocation} from "react-router-dom";
import {GenerateInfoHeader, GenereateItemInfo} from "./orderSummaryGenerator"

function OrderConfirm() {
  const order = getOrderDetails();
  //<h1>Name Recieved Was: {location.state.name}</h1>

  return (
    <>
      <h1>Your Order Has Been Confirmed! Thank you for shopping at "Get Connected!"</h1>

      <GenerateInfoHeader order={order} />
      {order.items.map((phone, index)=>{
        return <GenereateItemInfo key={index} item={phone} currency={order.currency}/>;
      })}
      
    </>
  );
}

//Change this method once database is hooked in, or once we pass data from different components
function getOrderDetails() {
  const location = useLocation();
  return orderInformation[1];
}

export default OrderConfirm;