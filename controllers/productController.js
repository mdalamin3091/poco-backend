const { validationResult } = require("express-validator");
const errorFormater = require("../utils/errorFormater");
const Product = require("../models/Product");
const Category = require("../models/Category");
const createProductController = async (req, res) => {
  try {
    const { name, title, price, description, category } = req.body;
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
    await Category.updateOne( 
      { categoryName: createProduct.category },
      {
        $push: {
          products: createProduct._id,
        },
      }
    );
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
    const updateCate = await Category.findOneAndUpdate(
      { categoryName: category },
      {
        $set: {
          categoryName: updateProduct.category,
        },
      },
      { new: true } 
    );
    console.log("updateProduct", updateProduct)
    console.log("updateCate", updateCate) 
    res.status(200).json("Product updated", updateProduct);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};
const deleteProductController = async (req, res) => {
  try {
    console.log("Delete Product");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};
const getAllProductController = async (req, res) => {
  try {
    console.log("Get All Product");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};
const getSingleProductController = async (req, res) => {
  try {
    console.log("Get Single Product");
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
