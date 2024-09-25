const { connection } = require("../utils/database"); // Adjust the path as necessary

// Function to get orders and determine their status
async function GetOrders(req, res) {
  const userId = req.params.id; // Assuming user Id is provided in the route parameter

  if (!userId) {
    return res.status(400).json({ message: "UserId is required" });
  }

  // SQL query to retrieve orders along with their approval status
  const query = `
    SELECT o.*, 
      CASE 
        WHEN COUNT(CASE WHEN a.Status = 'Approved' THEN 1 END) >= 2 THEN 'Approved'
        WHEN COUNT(CASE WHEN a.Status = 'Rejected' THEN 1 END) > 0 THEN 'Rejected'
        ELSE 'Pending'
      END AS OrderStatus
    FROM Orders o
    LEFT JOIN OrderAction a ON o.Id = a.OrderId
    WHERE o.UserId = ?
    GROUP BY o.Id
  `;

  connection.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching orders", error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    return res.status(200).json(results);
  });
}

module.exports = {
  GetOrders,
};
