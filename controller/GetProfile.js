const { connection } = require("../utils/database");

// Function to get user and profile information based on Id
async function GetProfile(req, res) {
  const userId = req.params.id; // Assuming user Id is provided in the route parameter

  if (!userId) {
    return res.status(400).json({ message: "UserId is required" });
  }

  // Query to get user information
  connection.query(
    'SELECT Name, ReviewerName, Email, PhoneNumber FROM Users WHERE Id = ?',
    [userId],
    (err, userResults) => {
      if (err) {
        return res.status(500).json({ message: "Error fetching user data", error: err });
      }

      if (userResults.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      // Query to get profile information
      connection.query(
        'SELECT AlternateNumber, AccountName, AccountNumber, IFSC FROM Profile WHERE UserId = ?',
        [userId],
        (err, profileResults) => {
          if (err) {
            return res.status(500).json({ message: "Error fetching profile data", error: err });
          }

          if (profileResults.length === 0) {
            // If no profile data is found, include empty/default profile information
            return res.status(200).json({
              ...userResults[0],
              AlternateNumber: null,
              AccountName: null,
              AccountNumber: null,
              IFSC: null,
            });
          }

          // Combine user and profile information
          const profileData = {
            ...userResults[0],
            ...profileResults[0],
          };

          return res.status(200).json(profileData);
        }
      );
    }
  );
}

module.exports = {
  GetProfile,
};
