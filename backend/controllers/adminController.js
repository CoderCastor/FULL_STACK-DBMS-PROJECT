const { getConnection } = require("../utils/db");

const getSubjectsData = (req, res) => {
  const connection = getConnection();
  // const { admin_id } = req.body;

  const query = `SELECT * FROM subject WHERE admin_id = 13 order by sub_id desc`;

  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    if (result.length > 0) {
      return res.json(result);
    } else {
      return res.json({ userExists: false });
    }
  });
};

const addSubject = async (req, res) => {
  try {
    const { sub_name, sub_code, sessions, user_id } = req.body;

    const query = `INSERT INTO subject (sub_name,sub_code,sessions,admin_id) VALUES (?,?,?,?)`;

    const connection = getConnection();
    connection.query(
      query,
      [sub_name, sub_code, sessions, user_id],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: "Database Error" });
        } else {
          return res
            .status(201)
            .json({ msg: "Subject Added successfully", added: true });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Error Hashing Password" });
  }
};

const deleteSubject = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(req.body.id);

    // res.json({data:req.body})

    // let user_id = 13;
    const query = `DELETE FROM subject WHERE sub_id = ?`;

    const connection = getConnection();
    connection.query(query, [id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database Error" });
      } else {
        return res
          .status(201)
          .json({ msg: "Subject DELETED successfully", DELETED: true });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error Hashing Password" });
  }
};

const insertToken = (req, res) => {
  try {
    const { token } = req.body;
    console.log(token);

    const query = `INSERT INTO teacher (token) VALUES (?)`;

    const connection = getConnection();
    connection.query(query, [token], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database Error" });
      } else {
        return res
          .status(201)
          .json({ msg: "Token Added Successfully", Inserted: true });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error while inserting token in database" });
  }
};

const availTokens = async (req, res) => {
  const connection = getConnection();

  const query = `SELECT teacher_id,token FROM teacher WHERE first_name IS NULL AND last_name IS NULL AND email is NULL`;

  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    if (result.length > 0) {
      return res.json(result);
    } else {
      return res.json({ tokenExists: false });
    }
  });
};



const getTeachers = async (req,res) =>{
  const connection = getConnection();

  const query = `SELECT * FROM teacher t JOIN subject s ON t.teacher_id = s.teacher_id`;

  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    if (result.length > 0) {
      return res.json(result);
    } else {
      return res.json({ tokenExists: false });
    }
  });
}

module.exports = {
  getSubjectsData,
  addSubject,
  deleteSubject,
  insertToken,
  availTokens,
  getTeachers,
};
