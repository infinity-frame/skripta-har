const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

// Config
const app = express();
const port = 3000;
const viewsPath = path.join(__dirname, "views");
const dbURI = "mongodb://localhost:27017";

// Middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.set("views", viewsPath);

// Routes
const indexrouter = require("./routes/index.js");
app.use("/", indexrouter);

const lessonrouter = require("./routes/lesson.js");
app.use("/lesson", lessonrouter);

// Start server
const start = async () => {
  try {
    await mongoose.connect(dbURI);
    app.listen(port, () => {
      console.log("Server started on port 3000");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
