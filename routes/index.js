const express = require("express");
const router = express.Router();

// Routes
router.get("/", function (req, res) {
  res.redirect('/lessons')
});

module.exports = router;