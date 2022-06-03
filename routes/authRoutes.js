const router = require("express").Router();
const {
  signupController,
  loginController,
} = require("../controllers/authController");
const {
  signupValidation,
} = require("../validations/authValidation");
router.post("/signup", signupValidation, signupController);
router.post("/login", loginController);

module.exports = router;
