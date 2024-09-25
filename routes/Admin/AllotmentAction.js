var express = require("express");
var router = express.Router();
const controller = require("../../controller/Admin/AllotmentAction");

router.put("/:id", controller.AllotmentAction);

module.exports = router;
