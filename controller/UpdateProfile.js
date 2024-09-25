const { connection } = require("../utils/database");

// Function to update user and profile based on Id
async function UpdateProfile(req, res) {
  const userId = req.params.id; // Assuming user Id is provided in the route parameter
  const {
    Name,
    ReviewerName,
    Email,
    PhoneNumber,
    AlternateNumber,
    AccountName,
    AccountNumber,
    IFSC,
  } = req.body;

  // Validate input data
  if (!userId) {
    return res.status(400).json({ message: "UserId is required" });
  }

  // Retrieve the current account number before updating
  connection.query(
    'SELECT AccountNumber FROM Profile WHERE UserId = ?',
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Error fetching current account details", error: err });
      }

      const oldAccountNumber = results[0]?.AccountNumber || null;

      // Check if the email is already used by another user
      if (Email) {
        connection.query(
          'SELECT Id FROM Users WHERE Email = ? AND Id != ?',
          [Email, userId],
          (err, emailResults) => {
            if (err) {
              return res.status(500).json({ message: "Database error", error: err });
            }

            if (emailResults.length > 0) {
              return res.status(409).json({ message: "Email already exists" });
            }

            updateUserAndProfile(userId, { Name, ReviewerName, Email, PhoneNumber, AlternateNumber, AccountName, AccountNumber, IFSC, oldAccountNumber }, res);
          }
        );
      } else {
        updateUserAndProfile(userId, { Name, ReviewerName, Email, PhoneNumber, AlternateNumber, AccountName, AccountNumber, IFSC, oldAccountNumber }, res);
      }
    }
  );
}

// Function to update user and profile and handle account log insertion if necessary
function updateUserAndProfile(userId, { Name, ReviewerName, Email, PhoneNumber, AlternateNumber, AccountName, AccountNumber, IFSC, oldAccountNumber }, res) {
  // Update Users table
  const userUpdateData = {
    Name: Name || null,
    ReviewerName: ReviewerName || null,
    Email: Email || null,
    PhoneNumber: PhoneNumber || null,
  };

  connection.query(
    'UPDATE Users SET ? WHERE Id = ?',
    [userUpdateData, userId],
    (err) => {
      if (err) {
        return res.status(500).json({ message: "Error updating user", error: err });
      }

      // Update Profile table
      const profileUpdateData = {
        AlternateNumber: AlternateNumber || null,
        AccountName: AccountName || null,
        AccountNumber: AccountNumber || null,
        IFSC: IFSC || null,
        UpdatedAt: new Date(),
      };

      connection.query(
        'UPDATE Profile SET ? WHERE UserId = ?',
        [profileUpdateData, userId],
        (err) => {
          if (err) {
            return res.status(500).json({ message: "Error updating profile", error: err });
          }

          // Check if account number has changed
          console.log(oldAccountNumber, AccountNumber);
          if (oldAccountNumber !== AccountNumber) {
            // Insert old and new account number into AccountLogs
            const accountLogData = {
              UserId: userId,
              OldAccount: oldAccountNumber,
              NewAccount: AccountNumber,
              CreatedAt: new Date(),
            };

            connection.query(
              'INSERT INTO AccountLogs SET ?',
              accountLogData,
              (err) => {
                if (err) {
                  return res.status(500).json({ message: "Error logging account change", error: err });
                }
                return res.status(200).json({ message: "User and profile updated successfully, account change logged" });
              }
            );
          } else {
            return res.status(200).json({ message: "User and profile updated successfully" });
          }
        }
      );
    }
  );
}

module.exports = {
  UpdateProfile,
};
