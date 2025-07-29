const express = require("express");
const { handleMyPost } = require("../controllers/dashBoard.controller");
const { jwtValidation } = require("../middleware/jwtverification.middleware");
const dashroute = express.Router();

dashroute.get("/mypost/:id", jwtValidation, handleMyPost);

module.exports = dashroute;
