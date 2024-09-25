const { connection } = require("../../utils/database");

// Function to get user and profile information based on Id
async function GetAdminAccess(req, res) {
  const userId = req.params.id; // Assuming user Id is provided in the route parameter

  if (!userId) {
    return res.status(400).json({ message: "UserId is required" });
  }

  // Query to get user information
  connection.query(
    'SELECT Dashboard, Admins, Allotments, Refund_Requests,Referals,Users FROM AdminAccess WHERE UserId = ?',
    [userId],
    (err, userResults) => {
      if (err) {
        return res.status(500).json({ message: "Error fetching user data", error: err });
      }
          return res.status(200).json(userResults);
    }
  );
}

module.exports = {
  GetAdminAccess,
};
