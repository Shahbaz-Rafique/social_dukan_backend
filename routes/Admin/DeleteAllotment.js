var express = require("express");
var router = express.Router();
const controller = require("../../controller/Admin/DeleteAllotment");

router.delete("/:id", controller.DeleteAllotment);

module.exports = router;
