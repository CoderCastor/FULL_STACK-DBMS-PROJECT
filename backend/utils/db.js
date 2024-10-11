const mysql = require("mysql");

let connection;

const connectDB = async () =>{
    try{
        connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "DBMS_Project",
        });
          
          console.log("Mysql Database Connected.");
          
    }catch(error){
        console.error('Database connection error:',error);
        
    }
}

//function for calling connection
const getConnection = () => connection;

module.exports = {connectDB, getConnection}


