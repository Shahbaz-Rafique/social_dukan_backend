const { connection } = require("../../utils/database");

// Controller to get refund details by refund Id
async function GetRefunds(req, res) {
    // SQL query to join Refund and Users tables
    const sqlQuery = `
        SELECT 
            r.Id,
            u.Name, 
            u.Email, 
            r.ReviewLink, 
            r.RefundAmount, 
            r.DeliveryDate AS CreatedAt, 
            r.ReviewScreenshot, 
            r.ClosedScreenshot ,
            r.Status
        FROM 
            Refund r 
        JOIN 
            Users u ON r.UserId = u.Id 
`;

    // Execute the query
    connection.query(sqlQuery,  (err, results) => {
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
    GetRefunds,
};
