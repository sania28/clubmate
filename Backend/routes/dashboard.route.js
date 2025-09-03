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

const cacheMiddleware = require("../middleware/cache.middleware");
const dashroute = express.Router();

dashroute.get("/dashinfo/allproject", (req, res, next) => {
  next();
}, cacheMiddleware, handleDashboardinfo);
dashroute.get("/project/read/:id", cacheMiddleware, handleProjectRead);

dashroute.post("/project/create", handleProjectCreate);
dashroute.patch("/project/update/:id", ProjectUpdateChecker, handleProjectUpdate);
dashroute.put("/project/member/:id", ProjectMembersChecker, handleProjectMembers);
dashroute.delete("/project/delete/:id", handleProjectdelete);

module.exports = dashroute;
