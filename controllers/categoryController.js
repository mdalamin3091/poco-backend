const Category = require("../models/Category");
const { validationResult } = require("express-validator");
const errorFormater = require("../utils/errorFormater");
const createCategoryController = async (req, res) => {
  const { categoryName, categoryImage } = req.body;
  const errors = validationResult(req).formatWith(errorFormater);
  if (!errors.isEmpty()) {
    res
      .status(400)
      .json({ error: errors.mapped(), value: { categoryName, categoryImage } });
  }
  try {
    const { categoryName, categoryImage } = req.body;
    const category = Category({
      categoryName,
      categoryImage,
    });
    const createCategory = await category.save();
    res.status(200).json("Category Created", createCategory);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error"); 
  }
};
const updateCategoryController = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const updateCategory = await Category.findOneAndUpdate(
      { _id: categoryId },
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );
    const updateCategorySave = await updateCategory.save();
    console.log(updateCategorySave)
    return res.status(200).json("Category Updated", updateCategorySave); 
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};
module.exports = {
  createCategoryController,
  updateCategoryController,
};
