const router = require("express").Router();
const {
  createProductController,
  updateProductController,
  getAllProductController,
  deleteProductController,
  getSingleProductController,
  searchProductController,
} = require("../controllers/productController");
const productValidation = require("../validations/productValidation");
const authorized = require("../middlewares/authorized");
router.post(
  "/createProduct",
  authorized,
  productValidation,
  createProductController
);
router.get("/", authorized, getAllProductController);
router.get("/search", authorized, searchProductController);
router.put(
  "/updateProduct/:productId",
  authorized,
  productValidation,
  updateProductController
);
router.delete("/deleteProduct/:productId", authorized, deleteProductController);
router.get("/:productId", authorized, getSingleProductController);

module.exports = router;
