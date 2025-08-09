const project = require("../modals/project.modal");
const { handleDecodeToken } = require("../service/jwtTokenGenerateAndDecode");

async function handleDashboardinfo(req, res) {
  const result = await project.find({});
  //data limiting part more than 10 project data cannot send to frontend
  const size = result.length;
  const data = [10];
  for (let i = 0; i < 10; i++) {
    data[i] = result[i];
    if (i > size) {
      break;
    }
  }
  return res.status(201).json(data);
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
  console.log(data);
  return res.status(201).json(data);
}
async function handleProjectUpdate(req, res) {
  return res.status(201).json({ msg: "Update" });
}
async function handleProjectdelete(req, res) {
  return res.status(201).json({ msg: "delete" });
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
  return res.status(201).json({ msg: "Read" });
}
module.exports = {
  handleDashboardinfo,
  handleProjectCreate,
  handleProjectRead,
  handleProjectUpdate,
  handleProjectdelete,
  handleProjectMembers,
};
