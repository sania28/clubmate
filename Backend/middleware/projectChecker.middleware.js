const { ClubleadVerification } = require("../service/roleVerification");
async function ProjectcreateChecker(req, res, next) {
  const token = req.cookies.token;
  const { title, shortinfo, description, techstack } = req.body;
  if (!title || !shortinfo || !description || !techstack) {
    return res.status(404).json({ msg: "All fields are require" });
  }
  if (ClubleadVerification(token) == false) {
    return res.status(404).json({ msg: "Unauthorized" });
  }
  next();
}
module.exports = {
  ProjectcreateChecker,
};
