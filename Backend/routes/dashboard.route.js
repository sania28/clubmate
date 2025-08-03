const express = require("express");
const { handleDashboardinfo } = require("../controllers/dashBoard.controller");
const { jwtValidation } = require("../middleware/jwtverification.middleware");
const dashroute = express.Router();

dashroute.get("/dashinfo", jwtValidation, handleDashboardinfo);

module.exports = dashroute;
