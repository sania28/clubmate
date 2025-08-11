const express = require("express");
const {
  handleDashboardinfo,
  handleProjectCreate,
  handleProjectRead,
  handleProjectUpdate,
  handleProjectdelete,
  handleProjectMembers,
} = require("../controllers/dashBoard.controller");
const {
  ProjectcreateChecker,
  ProjectMembersChecker,
  ProjectUpdateChecker,
} = require("../middleware/projectChecker.middleware");
const dashroute = express.Router();

dashroute.get("/dashinfo/allproject", handleDashboardinfo);
dashroute.post("/project/create", ProjectcreateChecker, handleProjectCreate);
dashroute.patch("/project/update/:id",ProjectUpdateChecker, handleProjectUpdate);
dashroute.put("/project/member/:id", ProjectMembersChecker, handleProjectMembers);
dashroute.get("/project/read/:id", handleProjectRead);
dashroute.delete("/project/delete/:id", handleProjectdelete);

module.exports = dashroute;
