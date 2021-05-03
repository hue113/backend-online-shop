const express = require("express");

const shopController = require("../controllers/shopController");
const productRouter = require("./productRoutes");
const authController = require("../controllers/authController");

const shopRouter = express.Router();

shopRouter.use("/:categoryId/products", productRouter);

// 1. routes for everyone
shopRouter.route("/").get(shopController.getShops);
shopRouter.route("/:id").get(shopController.getShop);

// 2. routes require authentication & restricted to Admin role
shopRouter.use(authController.protect, authController.restrictTo("admin"));
shopRouter.route("/").post(shopController.createShop);
shopRouter
  .route("/:id")
  .patch(shopController.updateShop)
  .delete(shopController.deleteShop);

module.exports = shopRouter;
