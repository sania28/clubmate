const mongoose = require("mongoose");
const url = process.env.MONGODB_URL;

const Connection = () => {
  mongoose
    .connect(url)
    .then(() => {
      console.log("Database is connected");
    })
    .catch((err) => {
      console.log("Error", err);
    });
};
module.exports = Connection;
