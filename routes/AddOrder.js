const express = require("express");
const router = express.Router();
const { AddOrder } = require("../controller/AddOrder");

router.post("/", AddOrder); 

module.exports = router;
