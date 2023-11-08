const express = require("express")
const router = express.Router()
const fs = require("fs")

router.get('/lessons/:lessonid', function(req, res) {
    let lessons = fs.readFileSync('./lessons.json', 'utf-8');
    lessons = JSON.parse(lessons)
    res.render(req.params.lessonid, { lesson: lessons.response[req.params.lessonid]})
})

module.exports = router