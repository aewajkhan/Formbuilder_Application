const mongoose = require("mongoose");
const colors = require("colors");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(colors.blue`MongoDB Connected to ${process.env.MONGO_URL}`);
  } catch (err) {
    console.error(colors.red`err.message${err.message}`);
  }
};

module.exports = connectDB;
