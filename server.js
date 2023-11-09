const express = require("express")
const app = express()
const fs = require("fs")
const mongoose = require("mongoose")
const port = 3000
const dbURI = "mongodb://localhost:27017"
app.set("view engine", "ejs")
app.use(express.static("public"))

    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const lessonrouter = require("./routes/lessonrouter.js")
app.use("/", lessonrouter)

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function(result) {
        console.log(`Successfully connected to db ${dbURI}`)
        app.listen(port)
        console.log(`App started! Listening on port ${port}`)
    })
    .catch(function(err){console.log(err)})