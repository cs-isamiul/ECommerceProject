const express = require("express");
const router = express.Router();

const { getTest, createOrder } = require("../controllers/processOrder");
const { getAllInventory, getSingleItem } = require("../controllers/inventory");

router.route("/processorder").get(getTest).post(createOrder);
router.route("/inventory").get(getAllInventory);
router.route("/inventory/single").get(getSingleItem);

module.exports = router;
