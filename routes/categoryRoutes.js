const router = require("express").Router();
const {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController,
  getCategoryController
} = require("../controllers/categoryController");
const authorized = require("../middlewares/authorized");
const categoryValidation = require("../validations/categoryValidation");
router.post(
  "/createCategory",
  authorized,
  categoryValidation,
  createCategoryController
);
router.get(
  "/",
  authorized,
  getAllCategoryController
);
router.get(
  "/:categoryId",
  authorized,
  getCategoryController
);
router.put(
  "/updateCategory/:categoryId",
  authorized,
  categoryValidation,
  updateCategoryController
);
router.delete(
  "/deleteCategory/:categoryId",
  authorized,
  deleteCategoryController
);
module.exports = router;
