var express = require("express");
var router = express.Router();
const controller = require("../../controller/Admin/AddAdmin");

router.post("/", controller.AddAdmin);

module.exports = router;
