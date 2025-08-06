const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    shortinfo: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    techstack: {
      type: String,
      required: true,
    },
    projectimg: {
      type: String,
    },
    member: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const project = mongoose.model("project", ProjectSchema);
module.exports = project;
