const express = require("express");
const controllerUsers = require("../../controllers/usersController");
const router = express.Router();

const guard = require("../../helpers/guard");

// const {
//   validateCreateCat,
//   validateUpdateCat,
//   validateUpdateStatusCat
// } = require('../../validation/catsValidation')

router
  .post("/registration", controllerUsers.registration)
  .post("/login", controllerUsers.login)
  .post("/logout", guard, controllerUsers.logout);

module.exports = router;
