var express = require("express");
var router = express.Router();
const controller = require("../../controller/Admin/TemporaryBlockUser");

router.put("/:id", controller.TemporaryBlockUser);

module.exports = router;
