const router = require("express").Router();
const {
  createProductController,
  updateProductController,
  getAllProductController,
  deleteProductController,
  getSingleProductController,
  searchProductController,
  addProductReview,
  addProductInCart,
} = require("../controllers/productController");
const productValidation = require("../validations/productValidation");
const authorized = require("../middlewares/authorized");
router.post(
  "/createProduct",
  authorized,
  productValidation,
  createProductController
);
router.get("/", getAllProductController);
router.get("/search", searchProductController);
router.put(
  "/updateProduct/:productId",
  authorized,
  productValidation,
  updateProductController
);
router.delete("/deleteProduct/:productId", authorized, deleteProductController);
router.get("/:productId", getSingleProductController);
router.post("/review/:productId", authorized, addProductReview);
router.post("/addToCart/:productId", authorized, addProductInCart);

module.exports = router;
