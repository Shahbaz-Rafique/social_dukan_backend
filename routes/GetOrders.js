var express = require("express");
var router = express.Router();
const controller = require("../controller/GetOrders");

router.get("/:id", controller.GetOrders);

module.exports = router;
