const { connection } = require("../../utils/database");

// Function to update the status of a refund based on its Id
async function UpdateRefundStatus(req, res) {
    const refundId = req.params.id; // Get the refund ID from request parameters
    const { status } = req.body; // Get the new status from the request body

    // First, fetch the refund to check its current status
    connection.query(
        'SELECT status FROM Refund WHERE Id = ?',
        [refundId],
        (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Error fetching refund data", error: err });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: "Refund not found" });
            }

            // Update the refund's status
            connection.query(
                'UPDATE Refund SET status = ? WHERE Id = ?',
                [status, refundId],
                (updateErr) => {
                    if (updateErr) {
                        return res.status(500).json({ message: "Error updating refund status", error: updateErr });
                    }

                    return res.status(200).json({
                        message: `Refund status updated successfully`,
                        refundId: refundId,
                        newStatus: status,
                    });
                }
            );
        }
    );
}

module.exports = {
    UpdateRefundStatus,
};
