var express = require("express");
var router = express.Router();
const controller = require("../../controller/Admin/PermanentBlockUser");

router.put("/:id", controller.PermanentBlockUser);

module.exports = router;
