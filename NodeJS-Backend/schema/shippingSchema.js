const mongoose = require('mongoose');

const ShippingSchema = new mongoose.Schema({
    shippingInfo: {
        shippingFirstName: {
            type: String,
            required:[true],
            trim:true,
        },
        shippingLastName: {
            type: String,
            required:[true],
            trim:true,
        },
        shippingPhoneNumber: {
            type: String,
            required:[true],
            trim:true,
        },
        shippingAddressOne: {
            type: String,
            required:[true],
            trim:true,
        },
        shippingAddressTwo: {
            type: String,
            required:[false],
            trim:true,
        },
        shippingCity: {
            type: String,
            required:[true],
            trim:true,
        },
        shippingState: {
            type: String,
            required:[true],
            trim:true,
        },
        shippingZip: {
            type: String,
            required:[true],
            trim:true,
        } 
    },
});

module.exports = ShippingSchema;

