const { connection } = require("../utils/database");

// Function to add an order
async function AddOrder(req, res) {

  // Extract file information and other data from the request
  const { UserId, DealType, ReviewerName, Brand, Mediator, OrderId, OrderAmount,SS , ProductCode} = req.body;
  const fileName = SS; 

  // Validate input data
  if (!UserId || !OrderAmount) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  // Check if UserId exists in the Users table
  connection.query('SELECT * FROM Users WHERE Id = ?', [UserId], (err, results) => {
    if (err) {
      console.error("Error checking UserId:", err);
      return res.status(500).json({ message: "Error checking UserId", error: err });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ message: "UserId not found" });
    }

    // Prepare the data to insert into the Orders table
    const orderData = {
      UserId: UserId,
      DealType: DealType,
      ReviewerName: ReviewerName || null,
      Brand: Brand || null,
      Mediator: Mediator || null,
      OrderId: OrderId || null,
      SS: fileName, // Save only the file name
      OrderAmount: OrderAmount,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      ProductCode: ProductCode
    };

    // Insert the new order into the Orders table
    connection.query("INSERT INTO Orders SET ?", orderData, (err, result) => {
      if (err) {
        console.error("Error inserting order:", err);
        return res.status(500).json({ message: "Error inserting order", error: err });
      }

      return res.status(201).json({
        message: "Order added successfully",
        orderId: result.insertId,
      });
    });
  });
}

module.exports = {
  AddOrder,
};
