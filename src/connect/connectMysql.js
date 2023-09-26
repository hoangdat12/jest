// db.js
const mysql = require('mysql2/promise');

// Replace with your actual database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'hoangdat12',
  database: 'mydatabase',
  port: 3306,
};

const connectDb = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    return connection;
  } catch (err) {
    throw err;
  }
};

module.exports = connectDb;
