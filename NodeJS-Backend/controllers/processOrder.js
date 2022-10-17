//const Order = require("../models/order");
const asyncWrapper = require("../middleware/async");
const {BadRequestError} = require("../errors/index");

const createOrder = asyncWrapper(async(req, res)=>{
    const {order} = req.body;
    if(order){
        console.log(order);
        res.status(200).json({message:"Order was recieved"});
    } else {
        throw new BadRequestError("Order must not be empty");
    }
})

const getTest = asyncWrapper(async(req, res)=>{
    //console.log(req);
    res.status(200).json({message:"Get success!"});
})
module.exports = {getTest, createOrder}