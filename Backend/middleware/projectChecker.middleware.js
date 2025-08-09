const { ClubleadVerification, GuestVerification } = require("../service/roleVerification");
async function ProjectcreateChecker(req, res, next) {
  const token = req.cookies.token
  const { title, shortinfo, description, techstack } = req.body;
  if (!title || !shortinfo || !description || !techstack) {
    return res.status(404).json({ msg: "All fields are require" });
  }
  if (ClubleadVerification(token) == false) {
    return res.status(404).json({ msg: "Unauthorized" });
  }
  next();
}
async function ProjectUpdateChecker(req,res,next) {
    const token = req.cookies.token;
    
}
async function ProjectMembersChecker(req,res,next) {
  const token = req.cookies.token;
  const {name,stream,year} = req.body;
  //data check
  if(!name||!stream||!year){
    return res.status(401).json({msg:'All fields are require'})
  }
  //role check
  if (GuestVerification(token) == false) {
    return res.status(404).json({ msg: "Unauthorized" });
  }
  next();  
}
module.exports = {
  ProjectcreateChecker,
  ProjectMembersChecker
};
