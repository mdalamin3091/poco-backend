const router = require("express").Router();
const {
  signupController,
  loginController,
} = require("../controllers/authController");
const {
  signupValidation,
  loginValidation,
} = require("../validations/authValidation");
router.post("/signup", signupValidation, signupController);
router.post("/login", loginValidation, loginController);

module.exports = router;
