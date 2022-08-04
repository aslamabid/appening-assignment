const express = require('express');
const app = express();
const bodyParser = require("body-parser");
require('dotenv').config()

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const user = require("./routes/userRoute");

app.use("/api", user);


module.exports = app;