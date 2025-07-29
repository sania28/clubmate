const user = require("../modals/user.modal");

async function handleMyPost(req, res) {
  const Id = req.params.id; //objectId created in mongodb
  const mypost = await user.findOne({ Id });
  return res.status(201).json({ msg: "All post" });
}
module.exports = {
  handleMyPost,
};
