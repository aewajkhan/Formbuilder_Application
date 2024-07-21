const mongoose = require("mongoose");


const userData = new mongoose.Schema(
  {
    Name: String,
    email: String,
    Password: String,
    Age: Number,
    Date: String,
  },
  {
    timestamps: true,
    versionKey: false,
    
  }
);

const dataModel = mongoose.model("data", userData);

module.exports = dataModel;
