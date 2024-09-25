var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
require("./utils/database");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes");

var SignUpRouter = require("./routes/SignUp");
var LoginRouter = require("./routes/Login");
var AddOrderRouter = require("./routes/AddOrder");
var UpdateProfileRouter = require("./routes/UpdateProfile");
var GetProfileRouter = require("./routes/GetProfile");
var RefundRequestRouter = require("./routes/RefundRequest");
var CreateAllotmentRouter = require("./routes/CreateAllotment");
var GetAllotmentsRouter = require("./routes/GetAllotments");
var GetOrdersRouter1 = require("./routes/GetOrders");
var UpdatePasswordRouter = require("./routes/UpdatePassword");
var GetRefundRouter = require("./routes/GetRefund");
var GoogleLoginRouter = require("./routes/GoogleLogin");


var LoginRouter1 = require("./routes/Admin/Login");
var AddAdminRouter = require("./routes/Admin/AddAdmin");
var GetAdminsRouter = require("./routes/Admin/GetAdmins");
var GetAdminAccessRouter = require("./routes/Admin/GetAdminAccess");
var GetUsersRouter = require("./routes/Admin/GetUsers");
var TemporaryBlockUserRouter = require("./routes/Admin/TemporaryBlockUser");
var PermanentBlockUserRouter = require("./routes/Admin/PermanentBlockUser");
var GetAllotmentsRouter1 = require("./routes/Admin/GetAllotments");
var AllotmentActionRouter = require("./routes/Admin/AllotmentAction");
var GetOrdersRouter = require("./routes/Admin/GetOrders");
var AddOrderStatusRouter = require("./routes/Admin/AddOrderStatus");
var GetOrderLogsRouter = require("./routes/Admin/GetOrderLogs");
var GetAccountLogsRouter = require("./routes/Admin/GetAccountLogs");
var GetRefundsRouter = require("./routes/Admin/GetRefunds");
var UpdateRefundStatusRouter = require("./routes/Admin/UpdateRefundStatus");
var GetUserReferralsRouter = require("./routes/Admin/GetUserReferrals");
var GetOrdersForReferralRouter = require("./routes/Admin/GetOrdersForReferral");
var DeleteAllotmentRouter = require("./routes/Admin/DeleteAllotment");
var DeleteOrderRouter = require("./routes/Admin/DeleteOrder");


const { info } = require("console");
const { GetOrderLogs } = require("./controller/Admin/GetOrderLogs");

var app = express();
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// function validateAPIKey(req, res, next) {
//   const authkey =  req.header('api-key');
//   if (authkey && crypto.createHash('sha256').update(authkey).digest('hex') == process.env.API_KEY) {
//     next();
//   } else {
//     res.status(401).json({ error: 'Unauthorized Access' });
//   }
// }
// app.use((req, res, next) => {
//   if (req.path.startsWith('/images')) {
//     return next();
//   }
//   validateAPIKey(req, res, next);
// });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("", usersRouter);
// Users
app.use("/SignUp", SignUpRouter);
app.use("/Login", LoginRouter);
app.use("/AddOrder", AddOrderRouter);
app.use("/UpdateProfile", UpdateProfileRouter);
app.use("/GetProfile", GetProfileRouter);
app.use("/RefundRequest", RefundRequestRouter);
app.use("/CreateAllotment", CreateAllotmentRouter);
app.use("/GetAllotments", GetAllotmentsRouter);
app.use("/GetOrders", GetOrdersRouter1);
app.use("/UpdatePassword", UpdatePasswordRouter);
app.use("/GetRefund", GetRefundRouter);
app.use("/google-login", GoogleLoginRouter);


app.use("/Admin/Login", LoginRouter1);
app.use("/Admin/AddAdmin", AddAdminRouter);
app.use("/Admin/GetAdmin", GetAdminsRouter);
app.use("/Admin/GetAdminAccess", GetAdminAccessRouter);
app.use("/Admin/GetUsers", GetUsersRouter);
app.use("/Admin/TemporaryBlockUser", TemporaryBlockUserRouter);
app.use("/Admin/PermanentBlockUser", PermanentBlockUserRouter);
app.use("/Admin/GetAllotments", GetAllotmentsRouter1);
app.use("/Admin/AllotmentAction", AllotmentActionRouter);
app.use("/Admin/GetOrders", GetOrdersRouter);
app.use("/Admin/AddOrderStatus", AddOrderStatusRouter);
app.use("/Admin/GetOrderLogs", GetOrderLogsRouter);
app.use("/Admin/GetAccountLogs", GetAccountLogsRouter);
app.use("/Admin/GetRefunds", GetRefundsRouter);
app.use("/Admin/UpdateRefundStatus", UpdateRefundStatusRouter);
app.use("/Admin/GetUserReferrals", GetUserReferralsRouter);
app.use("/Admin/GetOrdersForReferral", GetOrdersForReferralRouter);
app.use("/Admin/DeleteAllotment", DeleteAllotmentRouter);
app.use("/Admin/DeleteOrder", DeleteOrderRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
