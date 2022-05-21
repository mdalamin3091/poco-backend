const Category = require("../models/Category");
const { validationResult } = require("express-validator");
const errorFormater = require("../utils/errorFormater");
const Product = require("../models/Product");
// create category
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
// get all category
const getAllCategoryController = async (req, res) => {
  try {
    const allCategory = await Category.find({});
    console.log(allCategory);
    res.status(200).json("All category", allCategory);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};
// update category
const updateCategoryController = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const findCategory = await Category.findOne({ _id: categoryId });
    const findProduct = await Product.find({
      category: findCategory.categoryName,
    });
    const updateProduct = await Product.updateMany(
      { category: findCategory.categoryName },
      {
        $set: {
          category: req.body.categoryName,
        },
      },
      { new: true }
    );
    const updateCategory = await Category.findOneAndUpdate(
      { _id: categoryId },
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );
    return res.status(200).json("Category Updated", updateCategory);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};
// delete category
const deleteCategoryController = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const findCategory = await Category.findOne({ _id: categoryId });
    const deleteProducts = await Product.deleteMany({
      category: findCategory.categoryName,
    });
    const deleteCategory = await Category.findByIdAndDelete({
      _id: categoryId,
    });
    res
      .status(200)
      .json("Delete your category with this category product", deleteCategory);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};

module.exports = {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController,
};
