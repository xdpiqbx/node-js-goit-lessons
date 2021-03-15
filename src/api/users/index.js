const express = require("express");
const controllerUsers = require("../../controllers/usersController");
const router = express.Router();

const upload = require("../../helpers/upload");
const guard = require("../../helpers/guard");
const { createAccountLimiter } = require("../../helpers/rateLimitHelper");

// const {
//   validateCreateCat,
//   validateUpdateCat,
//   validateUpdateStatusCat
// } = require('../../validation/catsValidation')
const { validateUploadAvatar } = require("../../validation/userValidation");

router
  .post("/registration", createAccountLimiter, controllerUsers.registration)
  .post("/login", controllerUsers.login)
  .post("/logout", guard, controllerUsers.logout)
  .patch(
    "/avatars",
    [guard, upload.single("avatar"), validateUploadAvatar],
    controllerUsers.avatars
  );
// "avatar" для аттрибута name <input type="file" name="avatar">
module.exports = router;
