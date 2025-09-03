const express = require("express");
require("dotenv").config();
const connection = require("./DB/database.connection");
const router = require("./routes/auth.route");
const dashroute = require("./routes/dashboard.route");
const cookieparser = require("cookie-parser");
const { jwtValidation } = require("./middleware/jwtverification.middleware");
const cors = require('cors')
const uploadRoutes = require("./routes/upload");
const path = require('path')

const app = express();
connection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(cors());

app.use('/public', express.static(path.join(__dirname, '../public')));

app.use("/api/auth", router);

app.use("/api/dashboard", (req, res, next) => {
  next();
}, jwtValidation, dashroute);


app.use("/api/upload", uploadRoutes);

module.exports = app;
