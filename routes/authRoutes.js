const router = require("express").Router();
const {
  signupController,
  loginController,
  updateProfile,
  changePassword,
  getAllUser,
  updateUserRole,
  deleteUser,
  productWishlist,
  singleUser,
} = require("../controllers/authController");
const { signupValidation } = require("../validations/authValidation");
const authorized = require("../middlewares/authorized");
router.post("/signup", signupValidation, signupController);
router.post("/login", loginController);
router.get("/allUsers", authorized, getAllUser);
router.get("/wishlist/:productId", authorized, productWishlist);
router.get("/singleUser", authorized, singleUser);
router.put("/updateProfile", authorized, updateProfile);
router.put("/changePassword", authorized, changePassword);
router.put("/updateRole/:id", authorized, updateUserRole);
router.delete("/deleteUser/:id", authorized, deleteUser);

module.exports = router;
