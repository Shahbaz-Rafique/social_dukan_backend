var express = require("express");
var router = express.Router();
const controller = require("../controller/CreateAllotment");

router.post("/", controller.CreateAllotment);

module.exports = router;
