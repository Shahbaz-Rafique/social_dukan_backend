var express = require("express");
var router = express.Router();
const controller = require("../../controller/Admin/UpdateRefundStatus");

router.put("/:id", controller.UpdateRefundStatus);

module.exports = router;
