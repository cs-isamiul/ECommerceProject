const mongoose = require('mongoose');

const SalesInfoSchema = new mongoose.Schema({
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
    paymentInfo: {
        paymentFirstName: {
            type: String,   
            required:[true], 
            trim:true,
        },
        paymentLastName: {
            type: String,   
            required:[true], 
            trim:true,
        },
        paymentCardNum: {
            type: String, 
            required:[true], 
            trim:true,
        },
        paymentCardCVC: {
            type: String,  
            required:[true], 
            trim:true,
        },
        paymentCardYear: {
            type: String, 
            required:[true], 
            trim:true,
        },
        paymentCardMonth: {
            type: String, 
            required:[true], 
            trim:true,
        },
    },
});

module.exports = mongoose.model("SalesInfoModel", SalesInfoSchema);
