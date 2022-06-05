const router = require("express").Router();
const {
  signupController,
  loginController,
  updateProfile,
  changePassword,
  getAllUser,
  updateUserRole
} = require("../controllers/authController");
const { signupValidation } = require("../validations/authValidation");
const authorized = require("../middlewares/authorized");
router.post("/signup", signupValidation, signupController);
router.post("/login", loginController);
router.get("/allUsers", getAllUser);
router.put("/updateProfile",  updateProfile);
router.put("/changePassword",  changePassword);
router.put("/updateRole/:id",  updateUserRole);

module.exports = router; 
