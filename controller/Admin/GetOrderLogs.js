const { connection } = require("../../utils/database");

// Function to get user and profile information based on Id
async function GetOrderLogs(req, res) {
const orderId = req.params.id;
  // Query to get user information
  connection.query(
    `SELECT Users.Name ,Users.Email, OrderAction.CreatedAt,OrderAction.Status FROM OrderAction Join Users On Users.Id = OrderAction.AdminId WHERE OrderAction.OrderId = ${orderId}`,
    (err, userResults) => {
      if (err) {
        return res.status(500).json({ message: "Error fetching user data", error: err });
      }
          return res.status(200).json(userResults);
    }
  );
}

module.exports = {
    GetOrderLogs,
};
