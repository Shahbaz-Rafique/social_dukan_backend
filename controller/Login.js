const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { connection } = require("../utils/database");

// Function to generate JWT token
function GenerateToken(user) {
  const payload = {
    Email: user.Email,
    Id: user.Id,
  };
  const secret = process.env.JWT_SECRET; // Use environment variable for the secret
  const token = jwt.sign(payload, secret, { expiresIn: '1h' }); // Token expires in 1 hour
  return token;
}

// Login function
async function Login(req, response) {
  const Email = req.body.Email;
  const Password = crypto
    .createHash("sha256")
    .update(req.body.Password)
    .digest("hex");

  // Query to check user credentials
  connection.query(
    `SELECT Id, Email FROM Users WHERE Email = ? AND Password = ? AND Active = true AND IsVerified = true and PermanentBlock = false`,
    [Email, Password],
    (err, res) => {
      if (err) {
        response.status(500).json({ message: "Database error", error: err });
        return;
      } else {
        if (res.length === 0) {
          return response.status(401).json({ message: "Invalid credentials" });
        } else {
          const token = GenerateToken(res[0]);
          return response.status(200).json({
            message: "Login successful",
            id: res[0].Id,
            email: res[0].Email,
            token: token,
          });
        }
      }
    }
  );
}

module.exports = {
  Login,
};
