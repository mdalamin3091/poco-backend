const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    personalDetails: [
      {
        fullName: {
          type: String,
          required: true,
          trim: true,
        },
        email: {
          type: String,
          required: true,
        },
      },
    ],
    shippingDetails: [
      {
        streetAddress: {
          type: String,
          required: true,
          trim: true,
        },
        city: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
        zip: {
          type: String,
          required: true,
        },
      },
    ],
    shippingCostAndMethod: [
      {
        shippingMethod: {
          type: String,
          required: true,
        },
        shippingCost: {
          type: Number,
          required: true,
        },
      },
    ],
    paymentDetails: [
      {
        COD: String,
        creditCart: {
          cartNumber: {
            type: Number,
          },
        },
        subtotal: Number,
        totalCost: Number,
        disCount: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);
module.exports = Order;
