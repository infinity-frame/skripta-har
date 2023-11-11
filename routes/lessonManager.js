const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const showdown = require("showdown");
const converter = new showdown.Converter();
//Setup mongoose and connect to the database
const mongoose = require("mongoose");
const dbURI =
  "mongodb+srv://krystofbruth:UAfblLK9YffSaDiE@learning.hlz0am2.mongodb.net/skripta-har";
mongoose
  .connect(dbURI)
  .then(function (result) {
    console.log(`Successfully connected to db ${dbURI}`);
  })
  .catch(function (err) {
    console.log(err);
  });
router.use(bodyParser.urlencoded({ extended: true }));

//Create schema & model for lesson
const Schema = mongoose.Schema;
const LessonSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    quiz: [
      {
        question: String,
        answers: [String],
      },
    ],
  },
  { timestamps: true }
);
const Lesson = mongoose.model("lesson", LessonSchema);

// Routes
router.post("/add-lesson", function (req, res) {
  //SEE QUIZ DOCUMENTATION FOR REFERENCE ON POSTING QUIZZES
  const strquizarr = req.body.quiz.split("|");
  let quizarr = new Array();
  strquizarr.forEach((obj) => {
    quizarr.push(JSON.parse(obj));
  });
  const lesson = new Lesson({
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
    quiz: quizarr,
  });
  lesson
    .save()
    .then(function (result) {
      res.status(201).send("201: Success");
    })
    .catch(function (err) {
      console.log(err);
      res.status(400).send("400: Bad request");
    });
});
router.get("/", function (req, res) {
  Lesson.find()
    .then(function (result) {
      res.render("index.ejs", { lessons: result, title: "Skripta Har" });
    })
    .catch(function (err) {
      console.log(err);
    });
});
router.get("/:lessonid", function (req, res) {
  Lesson.findById(req.params.lessonid)
    .then(function (result) {
      res.render("lesson.ejs", {
        converter: converter,
        lesson: result,
        title: `${result.title} | Skripta Har`,
      });
    })
    .catch(function (err) {
      console.log(err);
    });
});

module.exports = router;
