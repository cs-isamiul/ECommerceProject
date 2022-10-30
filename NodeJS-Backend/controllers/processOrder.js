//const Order = require("../models/order");
const axios = require("axios");
const asyncWrapper = require("../middleware/async");
const CUSTOMER_INFO_DB = require("../models/Customer-Info");
const OrderDB = CUSTOMER_INFO_DB.order;
const PaymentDB = CUSTOMER_INFO_DB.payment;
const ShippingDB = CUSTOMER_INFO_DB.shipping;

const createOrder = async (req, res) => {
    const { order } = req.body;
    //check to make sure order has items and later other fields
    if (order?.items) {
        //extract items, payment and shipping
        const { items, payment, shipping } = order;
        let message = "Confirmation Number";
        let statusCode = 201;

        //TODO: Make this work with path /inventory/single, method does not wait for axios call
        //Make a call to inventory for each item requested
        axios({
            method: "get",
            url: "http://localhost:5000/inventory",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        })
            .then((reply) => {
                //Go through each requested item and check if they are in inventory
                items.forEach(item => {
                    for(let i = 0; i < reply.data.length; i++){
                        //if requested too much, set message as unavailable
                        if (item.qty < 1 || (reply.data[i].id == item.id && reply.data[i].invQty < item.qty)) {
                            message = item.id;
                            statusCode = 500;
                            break;
                        }
                    }
                });
                
                //If not 201 then requested too many items
                //below here is where you put db creations
                
                
                res.status(statusCode).json({ message: message });
            })
            .catch((err) => {
                console.log("Error:" + err);
            });
    } else {
        res.status(500).json({ message: "Order must not be empty" });
    }
}

const getTest = asyncWrapper(async (req, res) => {
    console.log(req);
    const db1 = await OrderDB.find({});
    const db2 = await PaymentDB.find({});
    const db3 = await ShippingDB.find({});

    res.status(200).json({db1, db2, db3});
})
module.exports = { getTest, createOrder }