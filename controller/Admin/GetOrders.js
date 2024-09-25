const { connection } = require("../../utils/database");

// Function to get user and profile information based on Id
async function GetOrders(req, res) {
const userId = req.params.userId;
  // Query to get user information
  connection.query(
    `
    SELECT Orders.Id as Id, 
       Orders.UserId as UserId, 
       Orders.DealType, 
       Orders.ReviewerName, 
       Orders.Brand, 
       Orders.Mediator, 
       Orders.OrderId, 
       Orders.SS, 
       Orders.OrderAmount, 
       Orders.CreatedAt, 
       Orders.UpdatedAt, 
       Users.Name, 
       Users.Email, 
       Users.PhoneNumber,
       Users.IsVerified, 
       Users.Active, 
       Users.Role, 
       Users.TemporaryBlock, 
       Users.PermanentBlock, 
       OrderAction.Status, 
       OrderAction.Reason, 
       Refund.OrderId as RefundOrderId,

       -- New column for OrderStatus
       CASE 
         -- Approved by two admins
         WHEN SUM(CASE WHEN OrderAction.Status = 'Approved' THEN 1 ELSE 0 END) = 2 THEN 'Approved'
         
         -- Rejected by any admin
         WHEN SUM(CASE WHEN OrderAction.Status = 'Rejected' THEN 1 ELSE 0 END) >= 1 THEN 'Rejected'
         
         -- Approved by one admin and no rejection
         WHEN SUM(CASE WHEN OrderAction.Status = 'Approved' THEN 1 ELSE 0 END) = 1 
              AND SUM(CASE WHEN OrderAction.Status = 'Rejected' THEN 1 ELSE 0 END) = 0 THEN 'Pending'
         
         -- Default case (no actions)
         ELSE 'Pending'
       END AS OrderStatus

FROM Orders 
LEFT JOIN Users ON Users.Id = Orders.UserId 
LEFT JOIN OrderAction ON OrderAction.OrderId = Orders.Id
LEFT JOIN Refund ON Refund.OrderId = Orders.Id
GROUP BY Orders.Id;

    `,
    (err, userResults) => {
      if (err) {
        return res.status(500).json({ message: "Error fetching user data", error: err });
      }
          return res.status(200).json(userResults);
    }
  );
}

module.exports = {
    GetOrders,
};
