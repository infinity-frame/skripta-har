const express = require("express");
const router = express.Router();
const fs = require("fs");
const showdown = require("showdown");

// Routes
router.get("/:lessonId", function (req, res) {
  let lessons = fs.readFileSync("./lessons.json", "utf-8");
  lessons = JSON.parse(lessons);

  // Temporary reading of markdown from file. It will be replaced by reading markdown directly from the database.
  const markdown = fs.readFileSync(
    `${__dirname}/temp-md/${req.params.lessonId}.md`,
    "utf-8"
  );
  const converter = new showdown.Converter();
  const html = converter.makeHtml(markdown);

  res.render("lesson", {
    title: `Skripta HAR - ${lessons.response[req.params.lessonId].title}`,
    lesson: lessons.response[req.params.lessonId],
    html: html,
  });
});

module.exports = router;
