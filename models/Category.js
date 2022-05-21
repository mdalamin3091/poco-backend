const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
      maxlength: 15,
      trim: true,
    },
    categoryImage: {
      type: String,
      default: "https://i.ibb.co/1bwN1v4/category-11.png",
    }
  },
  {
    timestamps: true,
  }
);

const Category = model("Category", categorySchema);
module.exports = Category;
