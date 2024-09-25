const { connection } = require("../utils/database");

// Function to handle refund request and insert data into the Refund table
async function RefundRequest(req, res) {
    // Extract file information and other data from the request
    const { 
        UserId, 
        OrderId, 
        ReviewLink, 
        RefundAmount, 
        DeliveryDate, 
        ReviewScreenshot, 
        ClosedScreenshot, 
        AdditionalScreenshot 
    } = req.body;

    // Validate input data
    if (!UserId || !RefundAmount || !DeliveryDate) {
        return res.status(400).json({ message: "Required fields missing" });
    }

    // Prepare the data to insert into the Refund table
    const refundData = {
        UserId,
        OrderId,
        ReviewScreenshot: ReviewScreenshot || null,
        ClosedScreenshot: ClosedScreenshot || null,
        ReviewLink: ReviewLink || null,
        AdditionalScreenshot: AdditionalScreenshot || null,
        RefundAmount,
        DeliveryDate,
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
    };

    // Insert the new refund request into the Refund table
    connection.query("INSERT INTO Refund SET ?", refundData, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error inserting refund request", error: err });
        }

        return res.status(201).json({
            message: "Refund request created successfully",
            refundId: result.insertId,
        });
    });
}

module.exports = {
    RefundRequest,
};
