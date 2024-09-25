const { connection } = require("../../utils/database");

// Function to temporarily block/unblock a user based on Id
async function PermanentBlockUser(req, res) {
  const userId = req.params.id; // Get the user ID from request parameters

  // First, fetch the user to check their current TemporaryBlock status
  connection.query(
    'SELECT PermanentBlock FROM Users WHERE Id = ?',
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Error fetching user data", error: err });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      // Toggle the TemporaryBlock status (1 for blocked, 0 for unblocked)
      const currentStatus = results[0].PermanentBlock;
      const newStatus = currentStatus === 1 ? 0 : 1;

      // Update the user's TemporaryBlock status
      connection.query(
        'UPDATE Users SET PermanentBlock = ? WHERE Id = ?',
        [newStatus, userId],
        (updateErr) => {
          if (updateErr) {
            return res.status(500).json({ message: "Error updating block status", error: updateErr });
          }

          return res.status(200).json({ 
            message: `User ${newStatus === 1 ? 'permanently blocked' : 'unblocked'} successfully`,
            TemporaryBlock: newStatus
          });
        }
      );
    }
  );
}

module.exports = {
    PermanentBlockUser,
};
