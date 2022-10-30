const inventory = require("../data/phoneSpecifications.json");
const asyncWrapper = require("../middleware/async");
const Inventory = require("../models/inventorySchema")
const mongoose = require('mongoose');


const getAllInventory = asyncWrapper(async(req, res)=>{
    res.send(inventory.filter((phone) => phone.invQty > 0));
})

//make a request to update, put 
const updataInventoryDB = asyncWrapper(async(req, res)=>{


    //this program from line 15 to 24 is used to test if db data is retrievable 
    var TargetInventoryQty;
    TargetInventoryQty = Inventory.find()
        .then((result) =>{
            res.send(result)
            console.log(result) 
        })
        .catch((err)=>{
            console.log(err);
        });


    // //req will be {id, quantity}
    // const {id, qty} = req.body;
    // var TargetInventoryQty;
    // var newQty;
    
    // TargetInventory = await Inventory.find({"id": id})
    //     .then((result) => {
    //         TargetQuantity= TargetInventory.invQty; //gets the target inventory's quantity in db 
    //         console.log("origin value " +  TargetInventoryQty); //for debug purpose
    //         newQty = TargetInventoryQty - qty;  //new quantity will be (target inventory's quantity in db) - the qty that this req wants to delete
    //         console.log("newQty value " +  newQty);  //for debug purpose
    //     })
    //     .catch((err)=>{
    //         console.log(err);
    //     });
    // await Inventory.findByIdAndUpdate(TargetInventory.id, {
    //     invQty: newQty
    // });
    // res.send('Item Upadated!');


});

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