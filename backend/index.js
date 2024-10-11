const express = require('express');
const cors = require('cors')
const mysql = require('mysql');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));





// Route to get username by user ID
app.get('/user/username/:username', (req, res) => {
  const username = req.params.username;

  const sql = `SELECT username FROM admin WHERE username = ?`;
  
  db.query(sql, [username], (err, result) => {
    if (err) {
      return res.status(500).send('Database query failed');
    }

    if (result.length > 0) {
      const username = result[0].username;
      res.json({ username: username });
    } else {
      res.status(404).send('User not found');
    }
  });
});

app.get('/user/email/:email', (req, res) => {
    const email = req.params.email;
  
    const sql = `SELECT username FROM admin WHERE email = ?`;
    
    db.query(sql, [email], (err, result) => {
      if (err) {
        return res.status(500).send('Database query failed');
      }
  
      if (result.length > 0) {
        console.log(result);
        
        const email = result[0].email;
        res.json({ email: email });
      } else {
        res.status(404).send('User not found');
      }
    });
  });

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});