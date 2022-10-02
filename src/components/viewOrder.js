import React from "react";
import orderInformation from "../data/orderConfirmation.json"
import {GenerateInfoHeader, GenereateItemInfo} from "./orderSummaryGenerator"

function OrderSummary() {
  const orderNumber = 1;

  return (
    <>
      <GenerateInfoHeader order={orderInformation[orderNumber]} />
      {orderInformation[orderNumber].items.map((phone, index)=>{
        return <GenereateItemInfo key={index} item={phone} currency={orderInformation[orderNumber].currency}/>;
      })}
    </>
  );

}

export default OrderSummary;