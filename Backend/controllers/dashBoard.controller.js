const user = require("../modals/user.modal");

async function handleDashboardinfo(req, res) {
  
  return res.status(201).json({ msg: "All Info" });
}
async function handleProjectCreate(req, res) {
  
  return res.status(201).json({ msg: "create" });
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
