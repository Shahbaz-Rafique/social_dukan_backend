const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
  const { tokenId } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email } = ticket.getPayload();

    // Perform your login or registration logic here
    // ...

    res.status(200).json({ message: "Login successful", email });
  } catch (error) {
    res.status(400).json({ message: "Google login failed" });
  }
};
module.exports = {
    googleLogin,
};
