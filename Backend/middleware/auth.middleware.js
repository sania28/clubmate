const user = require("../modals/user.modal");
async function RegisterValidation(req, res, next) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(404).json({ msg: "All Fields are required" });
  }
  const isUserPresentAlready = await user.findOne({ email });
  if (isUserPresentAlready) {
    return res.json({ msg: "User already exist" });
  }
  next();
}

async function LoginValidation(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json({ mag: "All fields are require" });
  }
  const isUservalid = await user.findOne({ email });
  if (!isUservalid) {
    return res.status(404).json({ msg: "User Not Found" });
  }
  req.user = isUservalid;
  next();
}

module.exports = {
  RegisterValidation,
  LoginValidation,
};
