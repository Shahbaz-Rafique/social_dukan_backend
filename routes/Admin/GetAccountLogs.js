var express = require("express");
var router = express.Router();
const controller = require("../../controller/Admin/GetAccountLogs");

router.get("/:id", controller.GetAccountLogs);

module.exports = router;
