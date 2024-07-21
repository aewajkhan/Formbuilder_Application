const express = require("express");
const connectDB = require("./config/db");
const formRoutes = require("./routes/formRoutes");
const cors = require("cors");
const parser = require("body-parser");
const morgan = require("morgan");
const dotenv=require("dotenv")
dotenv.config()

const app = express();

// Connect to MongoDB...

connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes
app.use("/api/forms", formRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
