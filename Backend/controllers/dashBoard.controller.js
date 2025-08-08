const project = require("../modals/project.modal")

async function handleDashboardinfo(req, res) {
  const result = await project.find({});
  //data limiting part more than 10 project data cannot send to frontend
  const size = result.length
  const data =[10]
  for(let i=0;i<10;i++){
    data[i] = result[i]
    if(i>size){
      break
    }
  }
  return res.status(201).json(data)
}
async function handleProjectCreate(req, res) {
  const { title, shortinfo, description, techstack } = req.body;
  const newProject = await project.insertOne({
    title,shortinfo,description,techstack
  })
  const data ={
    title:newProject.title,
    shortinfo:newProject.shortinfo,
    createdBy:newProject.createdBy
  }
  console.log(data)
  return res.status(201).json(data)
}
async function handleProjectUpdate(req, res) {
  
  return res.status(201).json({ msg: "Update" });
}
async function handleProjectdelete(req, res) {
  
  return res.status(201).json({ msg: "delete" });
}
async function handleProjectRead(req, res) {
  
  return res.status(201).json({ msg: "Read" });
}
module.exports = {
  handleDashboardinfo,
  handleProjectCreate,
  handleProjectRead,
  handleProjectUpdate,
  handleProjectdelete
};
