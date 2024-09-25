const crypto = require("crypto");
const { connection } = require("../../utils/database");
const { transporter } = require("../../utils/nodemailer");

// Function to generate a random 6-digit password
const generatePassword = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a random 6-digit number
};

// Function to send email
const SendEmail = async (email, password) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Your Admin Account Credentials',
        text: `Dear Admin,\n\nYour account has been created successfully.\n\nEmail: ${email}\nPassword: ${password}\n\nPlease change your password after logging in.\n\nBest regards,\nSocial Dukan Team`,
    };

    await transporter.sendMail(mailOptions);
};

async function AddAdmin(req, response) {
    const { name, email, access, phoneNumber, reviewerName } = req.body;

    const password = generatePassword();
    const hashedPassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex"); // SHA256 hash of the password

    const isVerified = 1; // Set IsVerified to true
    const isActive = 1; // Set Active to true
    const role = 'Admin'; // Role

    // Prepare the data to insert into the Users table
    const userData = {
        Email: email,
        Name: name,
        Password: hashedPassword,
        PhoneNumber: phoneNumber || null, // Optional field
        ReviewerName: reviewerName || null, // Optional field
        isVerified: isVerified,
        Active: isActive,
        Role: role,
    };

    try {

        // Insert the new user data
        connection.query("INSERT INTO Users SET ?", userData, (err, result) => {
            if (err) {
                response.status(500).json({ message: "Error inserting user", error: err });
                return;
            }

            // Retrieve the newly created user's ID
            const newUserId = result.insertId;

            // Prepare the data to insert into the Profile table
            const AccessData = {
                UserId: newUserId,
                Dashboard: access.Dashboard,
                Admins: access.Admins,
                Allotments: access.Allotments,
                Refund_Requests: access.Refund_Requests,
                Referals: access.Referals,
                Users: access.Users
            };

            // Insert a new row in the Profile table
            connection.query("INSERT INTO AdminAccess SET ?", AccessData, (err) => {
                if (err) {
                    response.status(500).json({ message: "Error inserting profile", error: err });
                    return;
                }

                // Send an email to the user with the login credentials
                SendEmail(email, password);

                // Respond to the client with a success message
                response.status(200).json({ message: 'Admin created successfully and email sent.', userId: newUserId });
            });
        });
    } catch (error) {
        response.status(500).json({ message: 'Error sending OTP', error: error.message });
    }
}

module.exports = {
    AddAdmin,
};
