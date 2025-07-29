const express = require("express");
require("dotenv").config();
const connection = require("./DB/database.connection");
const router = require("./routes/auth.route");
const dashroute = require("./routes/dashboard.route");
const cookieparser = require("cookie-parser");

const app = express();
connection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.use("/api/auth", router);
app.use("/api/dashboard", dashroute);

module.exports = app;
