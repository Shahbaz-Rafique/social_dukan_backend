var express = require("express");
var router = express.Router();
const controller = require("../controller/RefundRequest");

router.post("/", controller.RefundRequest);

module.exports = router;
