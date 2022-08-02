const { validationResult } = require("express-validator");
const errorFormater = require("../utils/errorFormater");
const Product = require("../models/Product");
const Review = require("../models/Review");
const { STRIPE_SECRET } = require("../config/envConfig");
const Order = require("../models/Order");
const User = require("../models/User");
const stripe = require("stripe")(STRIPE_SECRET);

// create product
const createProductController = async (req, res) => {
  try {
    const {
      name,
      title,
      price,
      description,
      category,
      productImages,
      shortDescription,
    } = req.body;
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
      images: productImages,
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
    console.log(req.body);
    const errors = validationResult(req).formatWith(errorFormater);
    if (!errors.isEmpty()) {
      console.log(errors.mapped());
    }
    const updateProduct = await Product.findByIdAndUpdate(
      { _id: productId },
      req.body,
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
    const allProducts = await Product.find({});
    return res.status(200).json({ msg: "All product", allProducts });
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};

// get single product
const getSingleProductController = async (req, res) => {
  try {
    const { productId } = req.params;
    const getProduct = await Product.findOne({ _id: productId }).populate({
      path: "review",
      populate: {
        path: "user",
      },
    });
    return res.status(200).json({ msg: "Single product found", getProduct });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};

// search product query
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

//  add product review
const addProductReview = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;
    const { fullname, email, reviewText, ratingStar } = req.body;
    const review = Review({
      user: userId,
      fullname,
      email,
      reviewText,
      ratingStar,
    });
    const addReview = await review.save();
    await Product.findOneAndUpdate(
      { _id: productId },
      {
        $push: {
          review: addReview._id,
        },
      },
      {
        new: true,
      }
    );
    return res
      .status(200)
      .json({ msg: "Thanks for your review", review: addReview });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

// order controller
const orderController = async (req, res) => {
  try {
    const { totalCost } = req.body;
    const amount = Number(totalCost) * 100;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

// save order info controller
const saveCheckOutInfo = async (req, res) => {
  try {
    const {
      fullname,
      email,
      address,
      city,
      country,
      zip,
      selectedPaymentMethod,
      shippingCost,
      totalCost,
    } = req.body.checkOutInfo;
    const { last4, transaction } = req.body;
    const userId = req.userId;
    const orderInfo = await Order({
      personalDetails: {
        fullname,
        email,
      },
      shippingDetails: {
        address,
        city,
        country,
        zip,
      },
      shippingCostAndMethod: {
        shippingMethod: selectedPaymentMethod,
        shippingCost,
      },
      paymentDetails: {
        totalCost,
        transaction,
        last4,
      },
    });
    const saveOrder = await orderInfo.save();
    const updateUser = await User.findByIdAndUpdate(
      { _id: userId },
      {
        $push: {
          order: saveOrder._id,
        },
      },
      {
        new: true,
      }
    );
    console.log(updateUser)
    return res.status(200).json({ msg: "Success", saveOrder, updateUser });
  } catch (error) { 
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

module.exports = {
  getSingleProductController,
  getAllProductController,
  createProductController,
  updateProductController,
  deleteProductController,
  searchProductController,
  saveCheckOutInfo,
  addProductReview,
  orderController,
};
