const router = require("express").Router();
const { createProductController, updateProductController } = require("../controllers/productController");
const productValidation = require("../validations/productValidation");
const authorized = require("../middlewares/authorized");
router.post(
  "/createProduct",
  authorized,
  productValidation,
  createProductController
);
router.put(
  "/updateProduct/:productId",
  authorized,
  productValidation,
  updateProductController
);

module.exports = router;
