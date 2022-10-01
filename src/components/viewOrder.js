import React from "react";
import orderInformation from "../data/orderConfirmation.json"

function OrderSummary() {
  const orderNumber = 2;

  return (
    <>
      <GenerateInfoHeader order={orderInformation[orderNumber]} />
      {orderInformation[orderNumber].items.map((phone, index)=>{
        return <GenereateItemInfo key={index} item={phone} currency={orderInformation[orderNumber].currency}/>;
      })}
    </>
  );

}

/**
 * Pass in an entire order object. This will create an html header for this order.
 * @param {*} props pass in the order that needs to be rendered
 * @returns html with Order date, order toal, who it was shipped to, and delivery date/estimate
 */
function GenerateInfoHeader(props) {
  const { order } = props;
  //const orderItems = order.items;

  return (
    <>
      <div className="Order Header">
        <p>Order Placed on: {order.orderDate}</p>
        <p>Order Total: {order.currency}{order.total}</p>
        <p>Order Shipped to: {order.shipTo}</p>
        {/* Add in a delivered date. Maybe if item delivered, max and min estimates same?*/}
        {/* if(estimatedDeliveryDateMin === estimatedDeliveryDateMax){text says delivered on} */}
        <p>Deliverey Estimate: {order.estimatedDeliveryDateMin}-{order.estimatedDeliveryDateMax}</p>
        <hr />
      </div>
    </>
  );
}

/**
 * Pass in a single order item and generate an html response for that item.
 * @param {*} props single phone item
 * @returns html with the phones image, name and price
 */
function GenereateItemInfo(props) {
  const { item } = props;

  return (
    <>
      <div className="Item">
        <img src={item.imageUrl} height="auto" width="15%"/>
        <p>{item.brand} {item.model} @ {props.currency}{item.price}</p>
      </div>
    </>
  );
}

export default OrderSummary;