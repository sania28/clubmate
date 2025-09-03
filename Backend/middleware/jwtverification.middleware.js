const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

async function jwtValidation(req, res, next) {
  // Check cookie first, then fallback to Authorization header
  const token = req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

  console.log("🔍 Incoming Request:");
  console.log("  ➝ Cookies:", req.cookies);
  console.log("  ➝ Authorization Header:", req.headers["authorization"]);
  console.log("  ➝ Extracted Token:", token ? "[FOUND]" : "[MISSING]");

  if (!token) {
    console.warn("⚠️ No token provided, rejecting request.");
    return res.status(401).json({ msg: "User must be logged in" });
  }

  try {
    const ValidToken = jwt.verify(token, secret);
    console.log("✅ Token successfully verified!");
    console.log("  ➝ Decoded Payload:", ValidToken);

    // attach decoded data for downstream use
    req.user = ValidToken;
    next();
  } catch (err) {
    console.error("❌ JWT Verification Failed:");
    console.error("  ➝ Error Message:", err.message);
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
}

module.exports = { jwtValidation };
