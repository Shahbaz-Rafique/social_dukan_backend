const { connection } = require("../../utils/database");

// Controller to get refund details by refund Id
async function GetOrdersForReferral(req, res) {
    const userId = req.params.id;
    // SQL query to join Refund and Users tables
    const sqlQuery = `
        SELECT 
                o.OrderId, 
                o.Brand, 
                o.OrderAmount, 
                o.CreatedAt
            FROM 
                Orders o
            INNER JOIN 
                Users r ON o.UserId = r.Id
WHERE r.ReferralId = ?`;

    // Execute the query
    connection.query(sqlQuery, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Refund not found" });
        }

        // Return the results
        return res.status(200).json(results);
    });
}

module.exports = {
    GetOrdersForReferral,
};
