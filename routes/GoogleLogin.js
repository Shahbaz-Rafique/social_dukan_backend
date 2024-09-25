var express = require("express");
var router = express.Router();
const controller = require("../controller/GoogleLogin");

router.post("/", controller.googleLogin);

module.exports = router;
