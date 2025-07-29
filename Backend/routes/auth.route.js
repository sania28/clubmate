const express = require("express");
const {
  RegisterValidation,
  LoginValidation,
} = require("../middleware/auth.middleware");
const { handleSignup, handleLogin } = require("../controllers/auth.controller");
const { jwtValidation } = require("../middleware/jwtverification.middleware");
const { handleLogout } = require("../controllers/auth.controller");
const router = express.Router();

router.post("/signup", RegisterValidation, handleSignup);
router.post("/login", LoginValidation, handleLogin);
router.get("/logout",jwtValidation,handleLogout)

module.exports = router;
