var express = require("express");
var router = express.Router();
const controller = require("../../controller/Admin/GetAdmins");

router.get("/:id", controller.GetAdmins);

module.exports = router;
