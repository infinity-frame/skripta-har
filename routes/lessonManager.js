const express = require("express");
const router = express.Router();
const showdown = require("showdown");
const converter = new showdown.Converter();
//Setup mongoose and connect to the database
const mongoose = require("mongoose")
const dbURI = "mongodb+srv://krystofbruth:UAfblLK9YffSaDiE@learning.hlz0am2.mongodb.net/skripta-har"
mongoose.connect(dbURI)
.then(function(result) {
    console.log(`Successfully connected to db ${dbURI}`)
})
.catch(function(err){console.log(err)})

//Create schema & model for lesson
const Schema = mongoose.Schema
const LessonSchema = new Schema({
  title: {
      type: String,
      required: true
  },
  author: {
      type: String,
      required: true
  },
  content: {
      type: String,
      required: true
  },
  quiz: {
      type: Array,
      required: false
  }
}, {timestamps: true})
const Lesson = mongoose.model('lesson', LessonSchema)


// Routes
router.post('/add-lesson', function (req, res) {
  const lesson = new Lesson({
      title: req.body.title,
      author: req.body.author,
      content: req.body.content,
      quiz: req.body.quiz
  })
  lesson.save()
      .then(function(result) {console.log(`Successfully created new lesson: ${result}`)})
      .catch(function(err) {console.log(err)})
  res.status(201).send('201: Success')
})
router.get('/', function(req, res) {
  Lesson.find()
      .then(function(result) {res.render('index.ejs', {lessons: result})})
      .catch(function(err) {console.log(err)})
})
router.get('/:lessonid', function(req, res) {
  Lesson.findById(req.params.lessonid)
      .then(function(result){res.render('lesson.ejs', { converter: converter, lesson: result})})
      .catch(function(err) {console.log(err)})
})

module.exports = router;
