var express = require("express");
var router = express.Router();
const controller = require("../../controller/Admin/GetRefunds");

router.get("/", controller.GetRefunds);

module.exports = router;
