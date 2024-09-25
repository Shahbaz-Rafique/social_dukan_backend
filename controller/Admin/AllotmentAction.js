const { connection } = require("../../utils/database");

// Function to temporarily block/unblock a user based on Id
async function AllotmentAction(req, res) {
  const Id = req.params.id; // Get the user ID from request parameters
      connection.query(
        'UPDATE Allotments SET Status = ? WHERE Id = ?',
        [req.body.Status, Id],
        (updateErr) => {
          if (updateErr) {
            return res.status(500).json({ message: "Error updating block status", error: updateErr });
          }

          return res.status(200).json({ 
            message: `Allotment ${req.body.Status} successfully`,
          });
        }
  );
}

module.exports = {
    AllotmentAction,
};
