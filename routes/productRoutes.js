const express = require("express");
const productController = require("../controllers/productController");
const authController = require("../controllers/authController");
const reviewRouter = require("./reviewRoutes");

const productRouter = express.Router({ mergeParams: true });
productRouter.use("/:productId/reviews", reviewRouter);

// 1. routes for everyone
productRouter.route("/").get(productController.getProducts);
productRouter.route("/:id").get(productController.getProduct);
productRouter.route("/url/:name").get(productController.getProductByUrl);

// 2. routes require authentication & restricted to Admin role
productRouter.use(authController.protect, authController.restrictTo("admin"));
productRouter.route("/").post(productController.createProduct);
productRouter
  .route("/:id")
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = productRouter;
