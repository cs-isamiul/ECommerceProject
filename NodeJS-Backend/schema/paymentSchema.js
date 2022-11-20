const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
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
        paymentCVC: {
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
        shippingLabel: {
            type: String,
            required:[false],
            trim:true,
        }
    },
});

module.exports = PaymentSchema;