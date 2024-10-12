const { getConnection } = require("../utils/db");
const { hashPassword } = require('../services/authService')

const checkUsername = (req, res) => {
  const { username, role } = req.query;
  const tableName = getTableNameByRole(role);
  

  const query = `SELECT * FROM ${tableName} WHERE username = ?`;

  const connection = getConnection();
  connection.query(query, [username], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    if (result.length > 0) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  });
};

const checkEmail = (req, res) => {
    const { email, role } = req.query;
    
    const tableName = getTableNameByRole(role);
  
    const query = `SELECT * FROM ${tableName} WHERE email = ?`;
  
    const connection = getConnection();
    connection.query(query, [email], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      if (result.length > 0) {
        return res.json({ exists: true });
      } else {
        return res.json({ exists: false });
      }
    });
  };

const insertAdmin = async(req,res) => {
  try{
    const { first_name,last_name,username,email,password,college_name,college_id } = req.body;

  const hashedPassword = await hashPassword(password)
  console.log(hashedPassword);
  

  // const tableName = getTableNameByRole(req.body.role);

  const query = `INSERT INTO admin (first_name,last_name,username,email,password,college_name,college_id) VALUES (?,?,?,?,?,?,?)`;

  const connection = getConnection();
  connection.query(query,[first_name,last_name,username,email,hashedPassword,college_name,college_id],(err, result)=>{
    if(err){
      return res.status(500).json({error:"Database Error"});
    }else{
      return res.status(201).json({msg:"User created successfully"})
    }
  })
  }catch(error){
    res.status(500).json({error:"Error Hashing Password"})
  }
}

const getTableNameByRole = (role) => {
  if (role === "admin") return "admin";
  if (role === "teacher") return "teacher";
  return "student";
};

module.exports = { checkUsername,checkEmail,insertAdmin };
