const inventory = require("../data/phoneSpecifications.json");
const asyncWrapper = require("../middleware/async");
const {BadRequestError} = require("../errors/index");

const getAllInventory = asyncWrapper(async(req, res)=>{
    res.send(inventory.filter((phone) => phone.invQty > 0));
})

const getSingleItem = asyncWrapper(async(req, res)=>{
    const {id, model} = req.body;
    if(!id && !model){
        throw new BadRequestError("Must include id or model name");
    }

    const phone = inventory.filter((phone) => phone.id == id || phone.model == model);
    if(phone.length < 1){
        return res.status(404).json({message:"No phones found"});
    }

    res.status(200).json(phone[0]);
})

module.exports = {getAllInventory, getSingleItem}