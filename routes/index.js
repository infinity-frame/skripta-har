const express = require("express");
const router = express.Router();
const fs = require("fs");

// Routes
router.get("/", function (req, res) {
  let lessons = fs.readFileSync("./lessons.json", "utf-8");
  lessons = JSON.parse(lessons);

  res.render("index", {
    title: "Skripta HAR",
    lessons: lessons.response,
  });
});

module.exports = router;
