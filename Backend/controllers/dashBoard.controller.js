const project = require("../modals/project.modal");
const { handleDecodeToken } = require("../service/jwtTokenGenerateAndDecode");
const { ClubleadVerification } = require("../service/roleVerification");

async function handleDashboardinfo(req, res) {
  const page = req.query.page//page number start from Zero(0)
  const limit = req.query.limit||10
  const pageSkip = page*limit;
  const pages = await project.find({}).skip(pageSkip).limit(limit);//at a tile only 10 project's data transfer
  return res.status(201).json(pages)
}
async function handleProjectCreate(req, res) {
  const token = req.cookies.token;
  const decord = await handleDecodeToken(token);
  const Id = decord._id; 
  const { title, shortinfo, description, techstack } = req.body;
  const newProject = await project.insertOne({
    title,
    shortinfo,
    description,
    techstack,
    createdBy:Id,
  });
  const data = {
    title: newProject.title,
    shortinfo: newProject.shortinfo,
    createdBy: newProject.createdBy,
  };
  return res.status(201).json(data);
}
async function handleProjectUpdate(req, res) {
  try {
    const Id = req.params.id;
    const data = req.body;
    const updatedData = await project.findByIdAndUpdate(
       Id ,
      { $set: data },
      { new: true }
    );
    return res.status(201).json(updatedData);
  } catch (error) {
    return res.status(500).json(error)
  }
}
async function handleProjectdelete(req, res) {
  const token = req.cookies.token;
  const Id = req.params.id
  if(ClubleadVerification(token)==false){
    return res.status(401).json({msg:'UnAuthorized'})
  }
  const deletedProject = await project.findByIdAndDelete({_id:Id})
  return res.status(201).json({msg:"Sucessfully deleted"})
}
async function handleProjectMembers(req,res) {
  const {name,stream,year}= req.body;
  const Id = req.params.id;
  const UpdatedProjectMembers = await project.findByIdAndUpdate(
    { _id:Id },
    { $push: { member: { name, stream, year } } },
    { new: true }
  );
  return res.json(UpdatedProjectMembers)
}
async function handleProjectRead(req, res) {
  const Id = req.params.id;
  if(!Id){
    return res.status(404).json({msg:'Id is required'})
  }
  const projectdetail = await project.findById({_id:Id})
  return res.status(201).json(projectdetail)
}
module.exports = {
  handleDashboardinfo,
  handleProjectCreate,
  handleProjectRead,
  handleProjectUpdate,
  handleProjectdelete,
  handleProjectMembers,
};
