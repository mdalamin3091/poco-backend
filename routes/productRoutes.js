const router = require("express").Router();
const {
  createProductController,
  updateProductController,
  getAllProductController,
  deleteProductController,
  getSingleProductController,
  addProductReview,
  orderController,
  saveCheckOutInfo,
  getAllOrders,
  getAllReview,
  updateOrderStatus,
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
router.get("/allOrder",   getAllOrders);
router.put("/updateOrder/:id", authorized,  updateOrderStatus);
router.get("/allReview", getAllReview);
router.put(
  "/updateProduct/:productId",
  authorized,
  productValidation,
  updateProductController
);
router.delete("/deleteProduct/:productId", authorized, deleteProductController);
router.get("/:productId", getSingleProductController);
router.post("/review/:productId", authorized, addProductReview);
router.post("/create-payment-intent", authorized, orderController);
router.post("/saveOrderInfo", authorized, saveCheckOutInfo);


module.exports = router;
