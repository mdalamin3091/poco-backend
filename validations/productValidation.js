const { body } = require("express-validator");
const productValidation = [
  body("name")
    .notEmpty()
    .withMessage("Product Name is required")
    .isLength({ max: 50 })
    .withMessage("Product name must finish 50 characters")
    .trim(),
  body("title")
    .notEmpty()
    .withMessage("Product title is required")
    .isLength({ max: 150 })
    .withMessage("Product title must finish 150 characters")
    .trim(),
  body("description")
    .notEmpty()
    .withMessage("Product description is required")
    .trim(),
  body("price").notEmpty().withMessage("Product Price is required").trim(),
  body("category")
    .notEmpty()
    .trim()
    .withMessage("Product category is required"),
];

module.exports = productValidation;
