var express = require("express");
var router = express.Router();
const controller = require("../../controller/Admin/GetAdminAccess");

router.get("/:id", controller.GetAdminAccess);

module.exports = router;
