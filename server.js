const express = require("express");
const path = require("path");
const fs = require("fs");

//Read config.json
let config;
try {
  config = fs.readFileSync('config.json')
  config = JSON.parse(config)
  console.log('config.json loaded')
} catch (err) {
  console.log(`Error while reading config.json: ${err}`)
  process.exit(1)
}

// Config
const app = express();
const port = config.port;
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