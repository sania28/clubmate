const express = require("express");
const {
  handleDashboardinfo,
  handleProjectCreate,
  handleProjectRead,
  handleProjectUpdate,
  handleProjectdelete,
} = require("../controllers/dashBoard.controller");
const {
  ClubleadVerification,
  MemberVerification,
  GuestVerification,
} = require("../middleware/roleVerification");
const dashroute = express.Router();

dashroute.get("/dashinfo", handleDashboardinfo);
dashroute.post("/project/create", ClubleadVerification, handleProjectCreate);
dashroute.patch("/project/update", MemberVerification, handleProjectUpdate);
dashroute.put("/project/member", GuestVerification, handleProjectUpdate);
dashroute.get("/project/read", handleProjectRead);
dashroute.delete("/project/delete", ClubleadVerification,handleProjectdelete);

module.exports = dashroute;
