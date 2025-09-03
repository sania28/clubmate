const project = require("../modals/project.modal");
const { handleDecodeToken } = require("../service/jwtTokenGenerateAndDecode");
const { ClubleadVerification } = require("../service/roleVerification");
const cacheService = require("../service/cache.service"); // ✅ Import cache service

// 📌 GET all projects with pagination
async function handleDashboardinfo(req, res) {
  try {
    const page = parseInt(req.query.page) || 0; // default page = 0
    const limit = parseInt(req.query.limit) || 10;
    const pageSkip = page * limit;

    const pages = await project.find({}).skip(pageSkip).limit(limit);
    return res.status(200).json(pages);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// 📌 CREATE new project
async function handleProjectCreate(req, res) {
  try {
    const token = req.cookies.token;
    const decord = await handleDecodeToken(token);
    const Id = decord._id;

    const { title, shortinfo, description, techstack } = req.body;

    const newProject = await project.create({
      title,
      shortinfo,
      description,
      techstack,
      createdBy: Id,
    });

    // ✅ Invalidate cache
    await cacheService.delPattern("/dashinfo/allproject");

    const data = {
      title: newProject.title,
      shortinfo: newProject.shortinfo,
      createdBy: newProject.createdBy,
    };

    return res.status(201).json(data);
  } catch (error) {
  console.error("Error creating project:", error);
  res.status(500).json({ error: "An internal server error occurred." });
}

}

// 📌 UPDATE project
async function handleProjectUpdate(req, res) {
  try {
    const Id = req.params.id;
    const data = req.body;

    const updatedData = await project.findByIdAndUpdate(
      Id,
      { $set: data },
      { new: true }
    );

    // ✅ Invalidate cache
    await cacheService.delPattern("/dashinfo/allproject");

    return res.status(200).json(updatedData);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// 📌 DELETE project
async function handleProjectdelete(req, res) {
  try {
    const token = req.cookies.token;
    const Id = req.params.id;

    if (ClubleadVerification(token) === false) {
      return res.status(401).json({ msg: "UnAuthorized" });
    }

    await project.findByIdAndDelete(Id);

    // ✅ Invalidate cache
    await cacheService.delPattern("/dashinfo/allproject");

    return res.status(200).json({ msg: "Successfully deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// 📌 ADD project members
async function handleProjectMembers(req, res) {
  try {
    const { name, stream, year } = req.body;
    const Id = req.params.id;

    const UpdatedProjectMembers = await project.findByIdAndUpdate(
      { _id: Id },
      { $push: { member: { name, stream, year } } },
      { new: true }
    );

    // ✅ Invalidate cache
    await cacheService.delPattern("/dashinfo/allproject");
    await cacheService.del(`/api/dashboard/project/read/${Id}`);

    return res.status(200).json(UpdatedProjectMembers);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// 📌 READ single project
async function handleProjectRead(req, res) {
  try {
    const Id = req.params.id;
    if (!Id) {
      return res.status(400).json({ msg: "Id is required" });
    }

    const projectdetail = await project.findById(Id);
    return res.status(200).json(projectdetail);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  handleDashboardinfo,
  handleProjectCreate,
  handleProjectRead,
  handleProjectUpdate,
  handleProjectdelete,
  handleProjectMembers,
};
