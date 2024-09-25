const crypto = require("crypto");
const axios = require("axios");
const { connection } = require("../utils/database");

async function SignUp(req, response) {
  const { Email, Name, Password, PhoneNumber, ReviewerName, referralId } = req.body; // Get referralId from request body

  console.log(Email, Name, Password, PhoneNumber, ReviewerName, referralId)
  // Hash the password using SHA-256
  const sha256HashedPassword = crypto
    .createHash("sha256")
    .update(Password)
    .digest("hex");

  // Prepare the data to insert into the Users table
  const userData = {
    Email: Email,
    Name: Name,
    Password: sha256HashedPassword,
    PhoneNumber: PhoneNumber || null, // Optional field
    ReviewerName: ReviewerName || null, // Optional field
    ReferralId: referralId , // Add referralId, default to null if not provided
  };

  console.log(userData)

  // Step 1: Send OTP to the phone number
  try {
    // const otpResponse = await axios.post('https://control.msg91.com/api/v5/otp', {
    //   template_id: process.env.OTP_TEMPLATE_ID,
    //   mobile: PhoneNumber,
    //   authkey: process.env.OTP_API_KEY,
    // });

    // if (otpResponse.data.type !== 'success') {
    //   response.status(500).json({ message: 'Failed to send OTP', error: otpResponse.data });
    //   return;
    // }

    // console.log('OTP sent successfully:', otpResponse.data);

    // OTP sent successfully, now proceed to database operations
    // In a real-world application, you should also handle OTP expiration and retries

    // Step 2: Check if the email or phone number already exists
    connection.query(
      `SELECT * FROM Users WHERE Email = ? OR PhoneNumber = ?`,
      [Email, PhoneNumber],
      (err, res) => {
        if (err) {
          response.status(500).json({ message: "Database error", error: err });
          return;
        }

        if (res.length === 0) {
          // Insert the new user data
          connection.query("INSERT INTO Users SET ?", userData, (err, result) => {
            if (err) {
              response.status(500).json({ message: "Error inserting user", error: err });
              return;
            }

            // Retrieve the newly created user's ID
            const newUserId = result.insertId;

            // Prepare the data to insert into the Profile table
            const profileData = {
              UserId: newUserId,
              AlternateNumber: null,
              AccountName: null,
              AccountNumber: null,
              IFSC: null,
            };

            // Insert a new row in the Profile table
            connection.query("INSERT INTO Profile SET ?", profileData, (err) => {
              if (err) {
                response.status(500).json({ message: "Error inserting profile", error: err });
                return;
              }

              // Respond to the client with a success message
              response.status(200).json({ message: "User and profile created successfully", Email: Email });
            });
          });
        } else {
          response.status(409).json({ message: "User with this email or phone number already exists" });
        }
      }
    );
  } catch (error) {
    response.status(500).json({ message: 'Error sending OTP', error: error.message });
  }
}

module.exports = {
  SignUp,
};
