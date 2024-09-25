const { connection } = require("../../utils/database");

// Function to get user and profile information based on Id
async function GetUsers(req, res) {

  // Query to get user information
  connection.query(
    'SELECT * FROM Users WHERE Role = "User"',
    (err, userResults) => {
      if (err) {
        return res.status(500).json({ message: "Error fetching user data", error: err });
      }
          return res.status(200).json(userResults);
    }
  );
}

module.exports = {
    GetUsers,
};
