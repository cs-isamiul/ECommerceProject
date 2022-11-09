//const Order = require("../models/order");
const axios = require("axios");
const asyncWrapper = require("../middleware/async");
const CUSTOMER_INFO_DB = require("../models/Customer-Info");
const OrderDB = CUSTOMER_INFO_DB.order;
const PaymentDB = CUSTOMER_INFO_DB.payment;
const ShippingDB = CUSTOMER_INFO_DB.shipping;

const {
  AxiosGETSingle,
  AxiosPUTUpdateCount,
  AxiosPOSTCredit,
  AxiosPOSTShipping,
} = require("../helpers/AxiosCalls");

const createOrder = async (req, res) => {
  const { order } = req.body;
  //check to make sure order has items and later other fields
  if (order?.items && order?.payment && order?.shipping) {
    // console.log(">>>>>>>>>>>>>>>>>>>>>>>");
    // console.log(order);
    //extract items, payment and shipping
    const { items, payment, shipping } = order;

    //Go through all sent items and check inventory status
    for (i = 0; i < items.length; i++) {
      const inventoryItem = await AxiosGETSingle(items[i].id);
      if (!inventoryItem?.invQty || inventoryItem.invQty - order.qty < 0) {
        //If invalid qty or some other error
        return res.status(406).json({
          message: "looks like some of your items may be out of stock.",
          id: items[i].id,
        });
      }
    }

    //All qty validated, proceed to persist the order and decrement qty if order is saved.
    if (
      payment?.paymentFirstName &&
      payment?.paymentLastName &&
      payment?.paymentCardNum &&
      payment?.paymentCardCVC &&
      payment?.paymentCardYear &&
      payment?.paymentCardMonth
    ) {
      if (
        shipping?.shippingFirstName &&
        shipping?.shippingLastName &&
        shipping?.shippingPhoneNumber &&
        shipping?.shippingAddressOne &&
        shipping?.shippingCity &&
        shipping?.shippingState &&
        shipping?.shippingZip
      ) {
        //If we get here, then payment isn't empty and we can call the bank's service.
        //Call bank API to get a confirmation number
        const paymentConf = await AxiosPOSTCredit({
          name: "E-Shop",
          account: "314159265359",
          customer: payment,
        });
        //payment.confirmation
        if (paymentConf || paymentConf?.status != 201) {
          return res.status(500).json({ message: "Could not confirm card" });
        }
        payment.confirmation = paymentConf.data.confirmation;

        //If we get here, then payment went through and we can persist the data.
        const paymentInfo = await PaymentDB.collection.insertOne(payment);
        const shippingInfo = await ShippingDB.collection.insertOne(shipping);
        if (paymentInfo && shippingInfo) {
          const orderInfo = await OrderDB.collection.insertOne({
            orderTotal: "calculate after lab 9",
            orderPlacedOn: String(new Date()),
            items: items,
            payment: paymentInfo.insertedId,
            shipping: shippingInfo.insertedId,
          });
          if (orderInfo) {
            //Per lab9 requirements, after order has been persisted, initiate call to the shipping service.
            const shippingConf = AxiosPOSTShipping(shipping, {
              count: items.length,
              weight: 5,
              size: "4-4-4",
            });
            for (i = 0; i < items.length; i++) {
              const response = await AxiosPUTUpdateCount(
                items[i].id,
                items[i].qty
              );
              if (response !== 201) {
                console.log(
                  "Didn't update the inventory qty. Rollback all associated transactions."
                );
                //TODO: Rollback inventory transactions that have already occured up to this point.
                try {
                  await PaymentDB.collection.deleteOne({
                    _id: paymentInfo.insertedId,
                  });
                  await ShippingDB.collection.deleteOne({
                    _id: shippingInfo.insertedId,
                  });
                  await OrderDB.collection.deleteOne({
                    _id: orderInfo.insertedId,
                  });
                } catch (e) {
                  console.log(e);
                }
                return res.status(500).json({ message: "Failed to update DB" });
              }
              res.status(201).json({
                message: "Order success",
                confirmation: orderInfo.insertedId,
              });
              continue;
            }
            //If we get here, then inventory has been updated and we can continue processing.
            updateDBShippingInfo(shippingConf, orderInfo.insertedId);
          } else {
            console.log(
              "Didn't save the order record into the database. Must rollback payment and shipping records."
            );
            try {
              await PaymentDB.collection.deleteOne({
                _id: paymentInfo.insertedId,
              });
              await ShippingDB.collection.deleteOne({
                _id: shippingInfo.insertedId,
              });
            } catch (e) {
              console.log(e);
            }
            return res
              .status(500)
              .json({ message: "Could not insert order, missing info" });
          }
        } else {
          console.log("Didn't save payment and shipping into the database.");
          return res
            .status(500)
            .json({ message: "Could not insert order, missing info" });
        }
      } else {
        console.log("Empty shipping info");
        return res.status(400).json({ message: "Shipping cannot be empty!" });
      }
    } else {
      console.log("Empty payment info");
      return res.status(400).json({ message: "Payment cannot be empty!" });
    }
  } else {
    res.status(500).json({ message: "Order must not be empty" });
  }
  console.log("<<<<<<Leaving OrderProcess");
};

const updateDBShippingInfo = async (shippingConf, orderID) => {
  var label = await shippingConf;
  console.log(orderID);
  if (label.status == 201) {
    //TODO, update DB
    console.log(label.data.label);
  } else {
    //TODO, professor said to just focus on 'happy path' for now
    return -1;
  }
};
const getTest = asyncWrapper(async (req, res) => {
  console.log(req);
  const db1 = await OrderDB.find({});
  const db2 = await PaymentDB.find({});
  const db3 = await ShippingDB.find({});

  res.status(200).json({ db1, db2, db3 });
});
module.exports = { getTest, createOrder };
