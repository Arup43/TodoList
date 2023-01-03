//Basic Lib Imports
const express = require('express');
const router = require('./src/routes/api');
const app = express();
const bodyParser = require('body-parser');
require("dotenv").config();


//Security Middleware Lib Imports
const rateLimit = require("express-rate-limit");    
const helmet = require('helmet');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');


//Database Lib Imports
const mongoose = require('mongoose');


//Security Middleware Implementation
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

//Body Parser Implementation
app.use(bodyParser.json());

//Rate Limiter Implementation
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);


//Database Connection
let URI = process.env.DATABASE_CONNECTION_STRING;
let OPTIONS = {
    user:'',
    pass:'',
    autoIndex: true,
}
mongoose.connect(URI, OPTIONS, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Database Connected');
    }
});

//Routes
app.use('/api/v1', router);

//Undefined Routes
app.use("*", (req, res) => {
    res.status(404).json({
        status: "fail",
        message: "Route Not Found"
    });
});

module.exports = app;