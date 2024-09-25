const { connection } = require("../../utils/database");

// Function to insert an order action based on request data
async function AddOrderStatus(req, res) {
  const { adminId, orderId, status, reason } = req.body; // Destructure the required fields from the request body

  // SQL query to insert the new order action record
  const query = 'INSERT INTO OrderAction (AdminId, OrderId, Status, Reason) VALUES (?, ?, ?, ?)';

  connection.query(query, [adminId, orderId, status, reason], (insertErr) => {
    if (insertErr) {
      return res.status(500).json({ message: "Error inserting order action", error: insertErr });
    }

    return res.status(201).json({
      message: 'Order action recorded successfully!',
    });
  });
}

module.exports = {
    AddOrderStatus,
};
