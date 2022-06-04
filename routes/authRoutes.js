const router = require("express").Router();
const {
  signupController,
  loginController,
  updateProfile,
} = require("../controllers/authController");
const { signupValidation } = require("../validations/authValidation");
const authorized = require("../middlewares/authorized");
router.post("/signup", signupValidation, signupController);
router.post("/login", loginController);
router.put("/updateProfile",  updateProfile);

module.exports = router;
