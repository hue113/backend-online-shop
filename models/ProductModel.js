const mongoose = require("mongoose");
// const Shop = require("./ShopModel");

// Create a Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A product must have a name"],
    trim: true,
    maxlength: [
      40,
      "A product name must have less or equal then 40 characters",
    ],
    minlength: [5, "A product name must have more or equal then 5 characters"],
  },
  price: {
    type: Number,
    required: [true, "A product must have a price"],
    min: 0,
  },
  discount: {
    type: Number,
    required: [true, "A product must have a discount between 0 and 100"],
    min: 0,
    max: 100,
  },
  isNewItem: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  offerEnd: Date,
  rating: Number,
  saleCount: Number,
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Shop",
    required: [true, "Product must belong to a shop category"],
  },
  image: [String],
  shortDescription: String,
  fullDescription: String,
  tag: [String],
  variation: [
    {
      color: String,
      image: { type: String, required: true },
      size: [{ name: String, stock: Number }],
      price: { type: Number, required: true },
    },
  ],
});

productSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  const { _id: id, ...result } = object;
  return { ...result, id };
});

const Product = mongoose.model("products", productSchema); // name of model, schema

module.exports = Product;
