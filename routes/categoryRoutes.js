const router = require("express").Router();
const {
  createCategoryController,
  updateCategoryController,
} = require("../controllers/categoryController");
const authorized = require("../middlewares/authorized");
const categoryValidation = require("../validations/categoryValidation");
router.post(
  "/createCategory",
  authorized,
  categoryValidation,
  createCategoryController
);
router.put(
  "/updateCategory/:categoryId",
  categoryValidation,
  updateCategoryController
);
module.exports = router;
