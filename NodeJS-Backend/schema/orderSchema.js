const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    orderTotal: {
        type:String,
        required:[true, "Must provide an order total"]
    },
    orderPlacedOn: {
        type:String,
        required:[true, "Must provide date"]
    },
    items: [{
        id:String,
        qty:String
    }],
    payment:{
        type:ObjectId,
        required:[true, "Must provide payment refrence"]
    },
    shipping:{
        type:ObjectId,
        required:[true, "Must provide payment refrence"]
    }
});

module.exports = OrderSchema;
