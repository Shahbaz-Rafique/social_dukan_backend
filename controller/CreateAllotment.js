const { connection } = require("../utils/database");

// Create Allotment function
async function CreateAllotment(req, response) {
  const { UserId, ProductCode, MediatorName } = req.body;

  // Validate required fields
  if (!UserId || !ProductCode || !MediatorName) {
    return response.status(400).json({ message: "All fields are required" });
  }

  // Get the current date for createdAt and updatedAt
  const createdAt = new Date();
  const updatedAt = new Date();

  // SQL query to insert new allotment into the Allotments table
  const query = `
    INSERT INTO Allotments (UserId, ProductCode, MediatorName, Status, CreatedAt, UpdatedAt)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  // Execute the query
  connection.query(
    query,
    [UserId, ProductCode, MediatorName, 'Pending', createdAt, updatedAt],
    (err, result) => {
      if (err) {
        response.status(500).json({ message: "Database error", error: err });
        return;
      }

      // Successfully inserted allotment
      return response.status(201).json({
        message: "Allotment created successfully",
        allotmentId: result.insertId, // Get the inserted allotment ID
        UserId: UserId,
        ProductCode: ProductCode,
        MediatorName: MediatorName,
        Status: 'Pending',
        CreatedAt: createdAt,
        UpdatedAt: updatedAt
      });
    }
  );
}

module.exports = {
  CreateAllotment,
};
