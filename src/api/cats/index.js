const express = require("express");
const controllerCats = require("../../controllers/catsContrller");
const router = express.Router();

const {
  validateCreateCat,
  validateUpdateCat,
  validateUpdateStatusCat,
} = require("../../validation/catsValidation");

const guard = require("../../helpers/guard");

router
  .get("/", guard, controllerCats.getAll)
  .get("/:id", guard, controllerCats.getById)
  .post("/", guard, validateCreateCat, controllerCats.create)
  .put("/:id", guard, validateUpdateCat, controllerCats.update)
  .patch(
    "/:id/vaccinated",
    guard,
    validateUpdateStatusCat,
    controllerCats.updateStatus
  )
  .delete("/:id", guard, controllerCats.remove);

module.exports = router;
