const express = require("express");
const controllerUsers = require("../../controllers/usersController");
const router = express.Router();

const guard = require("../../helpers/guard");
const { createAccountLimiter } = require("../../helpers/rateLimitHelper");

// const {
//   validateCreateCat,
//   validateUpdateCat,
//   validateUpdateStatusCat
// } = require('../../validation/catsValidation')

router
  .post("/registration", createAccountLimiter, controllerUsers.registration)
  .post("/login", controllerUsers.login)
  .post("/logout", guard, controllerUsers.logout);

module.exports = router;
