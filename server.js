const express = require("express");
const path = require("path");
require('dotenv').config();

// Config
const app = express();
const port = process.env.PORT;
const viewsPath = path.join(__dirname, "views");

// Middleware
app.set("view engine", "ejs");
app.set("views", viewsPath);
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}))

// Routes
const indexRouter = require("./routes/index.js");
app.use("/", indexRouter);

const lessonRouter = require("./routes/lessonManager.js")
app.use("/lessons", lessonRouter);

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});