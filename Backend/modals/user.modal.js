const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role:{
      type:String,
      required:true,
      enum:["Admin","ClubLead","Member","Guest"]
    }
  },
  { timestamps: true }
);

const user = mongoose.model("user", UserSchema);
module.exports = user;
