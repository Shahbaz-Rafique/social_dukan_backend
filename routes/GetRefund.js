var express = require("express");
var router = express.Router();
const controller = require("../controller/GetRefund");

router.get("/:id", controller.GetRefund);

module.exports = router;
