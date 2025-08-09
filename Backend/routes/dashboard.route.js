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
} = require("../middleware/projectChecker.middleware");
const {
  ClubleadVerification,
  MemberVerification,
  GuestVerification,
} = require("../service/roleVerification");
const dashroute = express.Router();

dashroute.get("/dashinfo", handleDashboardinfo);
dashroute.post("/project/create", ProjectcreateChecker, handleProjectCreate);
dashroute.patch("/project/update", MemberVerification, handleProjectUpdate);
dashroute.put("/project/member/:id", ProjectMembersChecker, handleProjectMembers);
dashroute.get("/project/read", handleProjectRead);
dashroute.delete("/project/delete", ClubleadVerification, handleProjectdelete);

module.exports = dashroute;
