var express = require("express");
var router = express.Router();
const controller = require("../../controller/Admin/DeleteOrder");

router.delete("/:id", controller.DeleteOrder);

module.exports = router;
