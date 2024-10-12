const { getConnection } = require("../utils/db");
const { comparePassword } = require('../services/authService');

const findUserByUsernameAndEmail = (req, res) => {
  const connection = getConnection();
  const { username, password } = req.body;

  const query1 = `SELECT * FROM admin WHERE username = ?`;
  const query2 = `SELECT * FROM admin WHERE email = ?`;

  const usernameQuery = new Promise((resolve, reject) => {
    connection.query(query1, [username], (err, result) => {
      if (err) return reject(err);
      resolve(result.length > 0 ? result[0] : null);
    });
  });

  const emailQuery = new Promise((resolve, reject) => {
    connection.query(query2, [username], (err, result) => {
      if (err) return reject(err);
      resolve(result.length > 0 ? result[0] : null);
    });
  });

  Promise.all([usernameQuery, emailQuery])
    .then(async ([userByUsername, userByEmail]) => {
      let hashedPassword;

      if (userByUsername) {
        hashedPassword = userByUsername.password;
      } else if (userByEmail) {
        hashedPassword = userByEmail.password;
      }

      if (hashedPassword) {
        // If either user is found, check the password
        try {
          const isCorrect = await comparePassword(password, hashedPassword);
          if (isCorrect) {
            return res.json({ message: "Login successful" });
          } else {
            return res.status(401).json({ error: "Invalid password" });
          }
        } catch (error) {
          return res.status(500).json({ error: "Error comparing password" });
        }
      } else {
        // No user found with the given username or email
        return res.status(404).json({
          userFoundByUsername: !!userByUsername,
          userFoundByEmail: !!userByEmail,
          message: "User not found",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Database error" });
    });
};

module.exports = {
  findUserByUsernameAndEmail,
};
