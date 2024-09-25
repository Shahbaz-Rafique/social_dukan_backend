const { connection } = require("../../utils/database");

// Function to get user and profile information based on Id
async function GetAllotments(req, res) {

  // Query to get user information
  connection.query(
    'SELECT *,Allotments.Id as Id FROM Allotments Join Users On  Allotments.UserId = Users.Id',
    (err, userResults) => {
      if (err) {
        return res.status(500).json({ message: "Error fetching user data", error: err });
      }

      if (userResults.length === 0) {
        return res.status(404).json({ message: "Allotment not found" });
      }


          // Combine user and profile information
          const profileData = {
            userResults,
          };

          return res.status(200).json(profileData);
    }
  );
}

module.exports = {
  GetAllotments,
};
