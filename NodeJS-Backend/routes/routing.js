const express = require('express');
const router = express.Router();

const {getTest, createOrder} = require("../controllers/processOrder");

router.route("/processorder").get(getTest).post(createOrder)

module.exports = router;