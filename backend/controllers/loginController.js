const { getConnection } = require("../utils/db");
const { comparePassword } = require("../services/authService");

const findUserByUsername = (req, res) => {
  const connection = getConnection();
  const { username, password } = req.body;

  const query = `SELECT password FROM admin WHERE username = ? OR email = ?`;

  connection.query(query, [username,username], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    if (result.length > 0) {
      return res.json({ userExists: true });
    } else {
      return res.json({ userExists: false });
    }
  });
};

const checkPassword = async (req, res) => {
    const connection = getConnection();
    const { username, password } = req.body;
  
    const query = `SELECT password FROM admin WHERE username = ? OR email = ?`;
  
    connection.query(query, [username,username], async (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      
      let reqPassword = req.body.password
      let dbHashedPassword = result[0].password;
      let isCorrect = await comparePassword(reqPassword,dbHashedPassword)
      res.json({
        isCorrect:isCorrect   
      })
    });
  };

module.exports = { findUserByUsername,checkPassword };
