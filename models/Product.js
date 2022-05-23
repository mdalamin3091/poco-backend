const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 150,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: [
      {
        type: String,
        default: "https://i.ibb.co/1bwN1v4/category-11.png",
      },
    ],
    category: {
      type: String,
      required: true,
    },
    review: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    rating: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);
module.exports = Product;
