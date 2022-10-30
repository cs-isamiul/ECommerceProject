const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    Order: {
        orderTotal: {
            type: String,
            required:[true],
            trim:true,
        },
        orderPlacedOn: {
            type: String,
            required:[true],
            trim:true,
        },
        estimatedDeliveryDateMax: {
            type: String,
            required:[true],
            trim:true,
        },
        estimatedDeliveryDateMin: {
            type: String,
            required:[true],
            trim:true,
        },
    },
    Items: {
        itemIds: {
            type: Array,    // Store array of item id
            required:[true], 
            trim:true,
        },
        itemQty: {
            type: Array,    // Store array of item qty associated with item id above
            required:[true], 
            trim:true,
        }
    },
});

module.exports = mongoose.model("Order", OrderSchema);
