const { connection } = require("../../utils/database");

// Controller to get refund details by refund Id
async function GetUserReferrals(req, res) {
    // SQL query to join Refund and Users tables
    const sqlQuery = `
        SELECT 
                u.Id AS UserId,
                u.Name,
                u.Email,
                COUNT(r.Id) AS NumberOfReferrals,
                COALESCE(SUM(o.OrderCount), 0) AS NumberOfOrders
            FROM Users u
            LEFT JOIN Users r ON r.ReferralId = u.Id
            LEFT JOIN (
                SELECT UserId, COUNT(*) AS OrderCount
                FROM Orders
                GROUP BY UserId
            ) o ON o.UserId = r.Id
            GROUP BY u.Id
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
    GetUserReferrals,
};
