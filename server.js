const express = require("express")
const app = express()
const fs = require("fs")
const mongoose = require("mongoose")
const port = 3000
const dbURI = "mongodb://localhost:27017"
app.set("view engine", "ejs")
app.use(express.static("public"))

app.get("/", function(req, res) {
    let lessons = fs.readFileSync('./lessons.json', 'utf-8');
    lessons = JSON.parse(lessons)
    res.render("index.ejs", { lessons: lessons.response})
})

const lessonrouter = require("./routes/lessonrouter.js")
app.use("/", lessonrouter)

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function(result) {
        console.log(`Successfully connected to db ${dbURI}`)
        app.listen(port)
        console.log(`App started! Listening on port ${port}`)
    })
    .catch(function(err){console.log(err)})