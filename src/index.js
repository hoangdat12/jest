// Import the Express.js framework
const express = require('express');
const connectDb = require('./connect/connectMysql');

// Create an Express application
const app = express();

// Define a route for the root path ("/") and send a "Hello, World!" response
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Define the port on which the server will listen
const port = 3000;

connectDb();

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
