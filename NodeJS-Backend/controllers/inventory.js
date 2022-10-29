const inventory = require("../data/phoneSpecifications.json");
const asyncWrapper = require("../middleware/async");

const getAllInventory = asyncWrapper(async(req, res)=>{
    res.send(inventory.filter((phone) => phone.invQty > 0));
})

//make a request to update, put 
const updataInventoryDB = asyncWrapper(async(req, res)=>{
    const {id, qty} = req.body;
    res.status(200).json({message:"hi"});
})

const getSingleItem = asyncWrapper(async(req, res)=>{
    const {id, model} = req.body;
    if(!id && !model){
        res.status(500).json({message:"Id or Model required"});
    }

    const phone = inventory.filter((phone) => phone.id == id || phone.model == model);
    if(phone.length < 1){
        return res.status(404).json({message:"No phones found"});
    }

    res.status(200).json(phone[0]);
})

module.exports = {getAllInventory, getSingleItem, updataInventoryDB}