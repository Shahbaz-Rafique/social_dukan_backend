var express = require("express");
var router = express.Router();
const controller = require("../../controller/Admin/GetOrderLogs");

router.get("/:id", controller.GetOrderLogs);

module.exports = router;
