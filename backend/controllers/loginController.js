const { getConnection } = require("../utils/db");
const { comparePassword } = require("../services/authService");

const findUserByUsername = (req, res) => {
  const connection = getConnection();
  const { username, password,role } = req.body;

  const query = `SELECT password FROM ${role} WHERE username = ? OR email = ?`;

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
    const { username, password,role } = req.body;

    const getUserQuery = (role) => {
      // Create base part of the query based on the role
      let column = '';
      switch (role) {
        case 'admin':
          column = 'adminid';
          break;
        case 'teacher':
          column = 'teacher_id';
          break;
        case 'student':
          column = 'student_id';
          break;
        default:
          throw new Error('Unknown role');
      }
    
      // Construct the query dynamically based on the role
      const query = `SELECT password, ${column},first_name,last_name,username,email FROM ${role} WHERE username = ? OR email = ?`;
    
      return query;
    };
    
    const query = getUserQuery(role);


  
    // const query = `SELECT password FROM ${role} WHERE username = ? OR email = ?`;
  
    connection.query(query, [username,username], async (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      
      let reqPassword = req.body.password
      let dbHashedPassword = result[0].password;
      let isCorrect = await comparePassword(reqPassword,dbHashedPassword)
      res.json({
        isCorrect:isCorrect,
        result:result
      })
    });
  };


module.exports = { findUserByUsername,checkPassword };
