const express = require("express")
const app = express()
const fs = require("fs")
const port = 3000
app.set("view engine", "ejs")
app.use(express.static("public"))

app.get("/", function(req, res) {
    let lessons = fs.readFileSync('./lessons.json', 'utf-8');
    lessons = JSON.parse(lessons)
    res.render("index.ejs", { lessons: lessons.response})
})

app.listen(port)
console.log(`App started! Listening on port ${port}`)