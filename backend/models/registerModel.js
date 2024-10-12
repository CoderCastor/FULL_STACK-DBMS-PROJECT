const {getConnection} = require('../utils/db')

const findUsername = async(username) => {
    const connection = getConnection();
    const [rows] = await connection.execute(`SELECT username from admin where username = ?`,[username]);
    return rows[0];
}

module.exports = { findUsername };