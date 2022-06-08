const { validationResult } = require("express-validator");
const errorFormater = require("../utils/errorFormater");
const Product = require("../models/Product");
const Category = require("../models/Category");

// create product
const createProductController = async (req, res) => {
  try {
    const { name, title, price, description, category, productImages, shortDescription } = req.body;
    const errors = validationResult(req).formatWith(errorFormater);
    if (!errors.isEmpty()) {
      console.log(errors.mapped());
    }
    const product = Product({
      name,
      title,
      price,
      description,
      shortDescription,
      category,
      images:productImages,
    });
    const createProduct = await product.save();
    res
      .status(200)
      .json({ msg: "Product Created Successfull", product: createProduct });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// update product
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
    res.status(200).json({ msg: "Product updated", updateProduct });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};

// delete product
const deleteProductController = async (req, res) => {
  try {
    const { productId } = req.params;
    const deleteProduct = await Product.findByIdAndDelete({ _id: productId });
    res.status(200).json({ msg: "Product deleted", deleteProduct });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};

// get all product
const getAllProductController = async (req, res) => {
  try {
    // const { category } = req.query;
    const allProducts = await Product.find();
    console.log(allProducts);
    return res.status(200).json({ msg: "All product", allProducts });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};

// get single product
const getSingleProductController = async (req, res) => {
  try {
    const { productId } = req.params;
    const getProduct = await Product.findByIdAndUpdate({ _id: productId });
    return res.status(200).json({msg:"Single product found", getProduct});
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};

const searchProductController = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    if (category !== null) {
      query.category = category;
    }
    const products = await Product.find(query);
    if (products.length < 1) {
      return res.status(200).json({ msg: "Product not found" });
    }
    res.status(200).json({ msg: "Product found", products });
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
  searchProductController,
};
