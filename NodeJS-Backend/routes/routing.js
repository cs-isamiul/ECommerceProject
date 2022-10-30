const express = require('express');
const router = express.Router();

const {getTest, createOrder} = require("../controllers/processOrder");
const {getAllInventory, getSingleItem, updataInventoryDB} = require("../controllers/inventory");

router.route("/processorder")
    .get(getTest)
    .post(createOrder);
router.route("/inventory")
    .get(getAllInventory)
    .put(updataInventoryDB);
router.route("/inventory/single")
    .get(getSingleItem);

module.exports = router;