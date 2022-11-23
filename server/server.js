// Required libraries
const express = require('express');
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");

// Server port
const port = 6500;

// Parse the bodies
app.use(express.json());

// Protects from errors by setting headers
app.use(helmet());

// Console info on express calls
app.use(morgan("tiny"));

// Endpoints
app.get('/hello', (req, res) => {
    res.status(200).json({status: 200, message: "Hello"})
});

// Port listen
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});