const express = require("express");
const { getAllOrdersByEmail, createOrder } = require("./order.controller");
const router = express.Router();

router.get("/email/:email", getAllOrdersByEmail);
router.post("/create", createOrder);

module.exports = router;
