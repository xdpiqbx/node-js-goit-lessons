const express = require("express");
const controllerCats = require('../../controllers/catsContrller')
const router = express.Router();

const {
  validateCreateCat,
  validateUpdateCat,
  validateUpdateStatusCat
} = require('../../validation/catsValidation')

router
  .get("/", controllerCats.getAll)
  .get("/:id", controllerCats.getById)
  .post("/", validateCreateCat, controllerCats.create)
  .put("/:id", validateUpdateCat, controllerCats.update)
  .patch("/:id/vaccinated", validateUpdateStatusCat, controllerCats.updateStatus)
  .delete("/:id", controllerCats.remove);

module.exports = router