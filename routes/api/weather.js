const express = require('express')
const router = express.Router()

// define the home page route
router.get('/', function (req, res) {
  res.json({message: "Hello Weather"})
})

module.exports = router