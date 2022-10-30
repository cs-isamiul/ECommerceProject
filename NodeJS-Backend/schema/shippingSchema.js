const mongoose = require('mongoose');

const ShippingSchema = new mongoose.Schema({
    shippingInfo: {
        firstName: {
            type: String,
            required:[true],
            trim:true,
        },
        lastName: {
            type: String,
            required:[true],
            trim:true,
        },
        phoneNumber: {
            type: String,
            required:[true],
            trim:true,
        },
        address1: {
            type: String,
            required:[true],
            trim:true,
        },
        address2: {
            type: String,
            required:[false],
            trim:true,
        },
        city: {
            type: String,
            required:[true],
            trim:true,
        },
        state: {
            type: String,
            required:[true],
            trim:true,
        },
        zipCode: {
            type: String,
            required:[true],
            trim:true,
        } 
    },
});

module.exports = ShippingSchema;

