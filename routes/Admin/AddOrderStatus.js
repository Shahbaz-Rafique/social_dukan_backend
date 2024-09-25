var express = require("express");
var router = express.Router();
const controller = require("../../controller/Admin/AddOrderStatus");

router.post("/", controller.AddOrderStatus);

module.exports = router;
