const { validationResult } = require("express-validator");
const errorFormater = require("../utils/errorFormater");
const Product = require("../models/Product");
const Category = require("../models/Category");
const createProductController = async (req, res) => {
  try {
    const { name, title, price, description, category } = req.body;
    console.log(req.body);
    const errors = validationResult(req).formatWith(errorFormater);
    if (!errors.isEmpty()) {
      console.log(errors.mapped());
    }
    const product = Product({
      name,
      title,
      price,
      description,
      category,
    });
    const createProduct = await product.save();
    // await Category.updateOne(
    //   { categoryName: category },
    //   {
    //     $push: {
    //       products: createProduct._id,
    //     },
    //   }
    // );
    res.status(200).json("Product Created Successfull", createProduct);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};
const updateProductController = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, title, price, description, category } = req.body;
    const errors = validationResult(req).formatWith(errorFormater);
    if (!errors.isEmpty()) {
      console.log(errors.mapped());
    }
    const updateProduct = await Product.findByIdAndUpdate(
      { _id: productId },
      {
        $set: {
          name,
          title,
          price,
          description,
          category,
        },
      },
      { new: true }
    );
    res.status(200).json("Product updated", updateProduct);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};
const deleteProductController = async (req, res) => {
  try {
    const { productId } = req.params;
    const deleteProduct = await Product.findByIdAndDelete({ _id: productId });
    console.log(deleteProduct);
    res.status(200).json("Product", deleteProduct);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};
const getAllProductController = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    res.status(200).json("All product", allProducts);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};
const getSingleProductController = async (req, res) => {
  try {
    const { productId } = req.params;
    const getProduct = await Product.findByIdAndUpdate({ _id: productId });
    console.log(getProduct);
    res.status(200).json("Product", getProduct);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};

module.exports = {
  getSingleProductController,
  getAllProductController,
  createProductController,
  updateProductController,
  deleteProductController,
};
