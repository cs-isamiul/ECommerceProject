//const Order = require("../models/order");
const axios = require("axios");
const asyncWrapper = require("../middleware/async");
const CUSTOMER_INFO_DB = require("../models/Customer-Info");
const OrderDB = CUSTOMER_INFO_DB.order;
const PaymentDB = CUSTOMER_INFO_DB.payment;
const ShippingDB = CUSTOMER_INFO_DB.shipping;
const { AxiosGETSingle, AxiosPUTUpdateCount, AxiosPOSTCredit, AxiosPOSTShipping } = require("../helpers/AxiosCalls");

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
            if (!inventoryItem?.invQty && inventoryItem.invQty - items[i].qty <= 0) {
                //If invalid qty or some other error
                return res.status(406).json({ message: "Invalid", id: items[i].id });
            }
        }

        //All qty validated, decrement qty from DB
        for (i = 0; i < items.length; i++) {
            const response = await AxiosPUTUpdateCount(items[i].id, items[i].qty);
            //TODO, if response is not 201, roll back changes
            if (response !== 201) {
                return res.status(500).json({ message: "Failed to update DB" })
            }
        }

        //TODO Properly validate this stuff with schema
        //TODO if shipping & payment already exist, just point to it
        for(var key in payment){
            if(payment[key].length == 0){
                return res.status(400).json({messsage:"Payment cannot be empty"});
            }
        }

        //Call bank API to get a confirmation number
        const paymentConf = await AxiosPOSTCredit({name:"E-Shop", account:"314159265359", customer:payment});
        //payment.confirmation
        if(paymentConf.status != 201){
            return res.status(500).json({message:"Could not confirm card"});
        }

        payment.confirmation = paymentConf.data.confirmation;

        //Call shipping to get a confirmation number
        const shippingConf = AxiosPOSTShipping(shipping, {count:items.length, weight:5, size:"4-4-4"});

        for(var key in shipping){
            if(shipping[key].length == 0){
                return res.status(400).json({messsage:"Shipping cannot be empty"});
            }
        }

        if (payment?.paymentFirstName && payment?.paymentLastName && payment?.paymentCardNum && payment?.paymentCardCVC && payment?.paymentCardYear && payment?.paymentCardMonth) {
            if (shipping?.shippingFirstName && shipping?.shippingLastName && shipping?.shippingPhoneNumber && shipping?.shippingAddressOne && shipping?.shippingCity && shipping?.shippingState && shipping?.shippingZip) {
                const paymentInfo = await PaymentDB.collection.insertOne(payment);
                const shippingInfo = await ShippingDB.collection.insertOne(shipping);
                const orderInfo = await OrderDB.collection.insertOne({orderTotal:"calculate after lab 9", orderPlacedOn:String(new Date()), items:items, payment:paymentInfo.insertedId, shipping:shippingInfo.insertedId});
                res.status(201).json({message:"Order success", confirmation: orderInfo.insertedId});
                updateDBShippingInfo(shippingConf, orderInfo.insertedId);
            } else {
                return res.status(500).json({message:"Could not insert order, missing info"});
            }
        }
    } else {
        res.status(500).json({ message: "Order must not be empty" });
    }
    console.log("<<<<<<Leaving OrderProcess");
}

const updateDBShippingInfo = async(shippingConf, orderID) => {
    var label = await shippingConf;
    console.log(orderID);
    if(label.status == 201){
        //TODO, update DB
        console.log(label.data.label);
    } else {
        //TODO, professor said to just focus on 'happy path' for now
        return -1;
    }
}

const getTest = asyncWrapper(async (req, res) => {
    console.log(req);
    const db1 = await OrderDB.find({});
    const db2 = await PaymentDB.find({});
    const db3 = await ShippingDB.find({});

    res.status(200).json({ db1, db2, db3 });
})
module.exports = { getTest, createOrder }