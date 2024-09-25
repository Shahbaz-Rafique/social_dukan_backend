var express = require("express");
var router = express.Router();
const controller = require("../controller/GetAllotments");

router.get("/:id", controller.GetAllotments);

module.exports = router;
