const express = require("express");
const router = express.Router();

/* GET contact listing. */
router.get("/contact", function (req, res, next) {
  res.render("contact", { title: "Contact" })
  // res.send("respond with a resource");
});

module.exports = router;
