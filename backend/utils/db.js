const mysql = require("mysql");

// Define the connection variable
let connection;

// Function to connect to the MySQL database
const connectDB = async () => {
    try {
        // Create the MySQL connection
        connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "", // Provide your MySQL root password
            database: "DBMS_Project" // Provide your database name
        });

        // Connect to the database
        connection.connect((err) => {
            if (err) {
                console.error('Database connection error:', err);
                return;
            }
            console.log("MySQL Database Connected.");
        });
    } catch (error) {
        console.error('Error while connecting to the database:', error);
    }
};

// Function to get the active MySQL connection
const getConnection = () => {
    if (!connection) {
        console.error("No MySQL connection established.");
    }
    return connection;
};

module.exports = { connectDB, getConnection };