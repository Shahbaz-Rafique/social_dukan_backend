var express = require("express");
var router = express.Router();
const controller = require("../../controller/Admin/GetAllotments");

router.get("/", controller.GetAllotments);

module.exports = router;
