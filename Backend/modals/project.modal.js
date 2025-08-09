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
    member: [
      {
        name: {
          type: String,
        },
        stream: {
          type: String,
        },
        year: {
          type: String,
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const project = mongoose.model("project", ProjectSchema);
module.exports = project;
