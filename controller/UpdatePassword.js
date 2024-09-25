const crypto = require('crypto'); // Built-in Node.js module for cryptographic functions
const { connection } = require('../utils/database');

// Function to update password
async function UpdatePassword(req, res) {
  const userId = req.params.id; // Assuming user Id is provided in the route parameter
  const { oldPassword, newPassword } = req.body;

  // Validate input data
  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: "Old password and new password are required" });
  }

  // Fetch the stored password hash for the user
  connection.query('SELECT Password FROM Users WHERE Id = ?', [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const storedHashedPassword = results[0].Password;

    // Hash the oldPassword input with SHA-256
    const oldPasswordHash = crypto.createHash('sha256').update(oldPassword).digest('hex');

    // Compare oldPasswordHash with the stored hashed password
    if (oldPasswordHash !== storedHashedPassword) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    // Hash the new password using SHA-256
    const newPasswordHash = crypto.createHash('sha256').update(newPassword).digest('hex');

    // Update the password in the database
    connection.query('UPDATE Users SET Password = ? WHERE Id = ?', [newPasswordHash, userId], (err) => {
      if (err) {
        return res.status(500).json({ message: "Error updating password", error: err });
      }

      return res.status(200).json({ message: "Password updated successfully" });
    });
  });
}

module.exports = {
  UpdatePassword,
};
