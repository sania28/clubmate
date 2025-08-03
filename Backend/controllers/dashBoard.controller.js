const user = require("../modals/user.modal");

async function handleDashboardinfo(req, res) {
  const Id = req.params.id; //objectId created in mongodb
  const mypost = await user.findOne({ Id });
  return res.status(201).json({ msg: "All post" });
}
module.exports = {
  handleDashboardinfo,
};
