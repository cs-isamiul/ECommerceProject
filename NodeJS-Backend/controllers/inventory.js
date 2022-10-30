const inventory = require("../data/phoneSpecifications.json");
const asyncWrapper = require("../middleware/async");
const Inventory = require("../models/inventorySchema")
const mongoose = require('mongoose');


const getAllInventory = asyncWrapper(async(req, res)=>{
    res.send(inventory.filter((phone) => phone.invQty > 0));
})

//make a request to update, put 
const updataInventoryDB = asyncWrapper(async(req, res)=>{

    //req will be {id, quantity}
    const {id, qty} = req.body;
    var newQty = 0;
    await Inventory.find({id: id})
        .then((result) => {
            const TargetQuantity= result[0].invQty; //gets the target inventory's quantity in db 

            newQty = TargetQuantity - qty;  //new quantity will be (target inventory's quantity in db) - the qty that this req wants to delete
            if(newQty < 0 || qty < 0){
                return res.status(400).json({message:"Not valid quantity in db or request quantity"});
            }

            else{
                Inventory.updateOne({id: id}, {
                    invQty: newQty
                })
                .then((result) => {
                        res.status(201).json({message:"Successfully updated in database."});
                    })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({message:"There is problem on the server side."});
                });
            }

        })
        .catch((err)=>{
            console.log(err);
            res.status(404).json({message:"Couldn't find data"});
        });
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