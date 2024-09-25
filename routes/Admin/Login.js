var express = require("express");
var router = express.Router();
const controller = require("../../controller/Admin/Login");

router.post("/", controller.Login);

module.exports = router;
