const user = require("../modals/user.modal");
const {
  handleHashPassword,
  handleDecordPassword,
} = require("../service/hashPassword");
const { handleGenerateToken } = require("../service/jwtTokenGenerate");

async function handleSignup(req, res) {
  try {
    const { name, email, password } = req.body;
    const hashPassword = await handleHashPassword(password);
    const userinfo = await user.insertOne({
      name,
      email,
      password: hashPassword,
    });
    userinfo.password = " ";
    return res.status(201).json(userinfo);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function handleLogin(req, res) {
  try {
    const { password } = req.body;
    const Userinfo = req.user;
    const { name, email } = Userinfo;
    const hashpassword = Userinfo.password;
    const isPasswordValid = await handleDecordPassword(hashpassword, password);
    if (isPasswordValid == false) {
      return res.status(404).json({ msg: "Invalid Password" });
    }
    const token = await handleGenerateToken(name, email);
    res.cookie("token", token, { maxAge: 24 * 60 * 60 * 1000 });//max 1 day
    return res.status(201).json({ msg: "Login is Sucessfull" });
  } catch (error) {
    console.log(error)
    return res.status(500).json(error);
  }
}
async function handleLogout(req,res) {
  res.cookie("token"," ")
  return res.status(201).json({msg:'Logout was sucessfull'})
}

module.exports = {
  handleLogin,
  handleSignup,
  handleLogout
};
