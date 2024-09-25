var express = require("express");
var router = express.Router();
const controller = require("../../controller/Admin/GetUserReferrals");

router.get("/", controller.GetUserReferrals);

module.exports = router;
