var express = require("express");
var router = express.Router();
const controller = require("../../controller/Admin//GetOrdersForReferral");

router.get("/:id", controller.GetOrdersForReferral);

module.exports = router;
