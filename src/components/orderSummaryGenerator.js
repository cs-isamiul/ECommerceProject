import React from "react";

/**
 * Pass in an entire order object. This will create an html header for this order.
 * @param {*} props pass in the order that needs to be rendered
 * @returns html with Order date, order toal, who it was shipped to, and delivery date/estimate
 */
function GenerateInfoHeader(props) {
    const { order } = props;

    let deliverDateMessage = `Delivery Estimate: ${order.estimatedDeliveryDateMin}-${order.estimatedDeliveryDateMax}`;
    if (order.estimatedDeliveryDateMax === order.estimatedDeliveryDateMin) {
        deliverDateMessage = "Delivered On: " + order.estimatedDeliveryDateMax;
    }


    return <>
        <div className="Order Header">
            <p>Order Placed on: {order.orderDate}</p>
            <p>Order Total: {order.currency}{order.total}</p>
            <p>Order Shipped to: {order.shipTo}</p>
            <p>{deliverDateMessage}</p>
            <hr />
        </div>
    </>
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
                <img src={item.imageUrl} alt={item.model} height="auto" width="15%" />
                <p>{item.brand} {item.model} @ {props.currency}{item.price}</p>
            </div>
        </>
    );
}

export {GenerateInfoHeader, GenereateItemInfo};