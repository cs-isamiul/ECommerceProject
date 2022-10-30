const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Payment", PaymentSchema);