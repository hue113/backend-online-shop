const express = require("express");

const orderController = require("../controllers/orderController");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const orderRouter = express.Router({ mergeParams: true });

// 1. routes for everyone
orderRouter.route("/").post(orderController.createOrder);

// 2. routes require authentication & restricted to Admin role
orderRouter.use(authController.protect, authController.restrictTo("admin"));
orderRouter.route("/").get(orderController.getOrders);
orderRouter
  .route("/:id")
  .get(orderController.getOrder)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);
orderRouter.get("/get/totalsales", orderController.getTotalSales);
orderRouter.get("/get/count", orderController.getOrderCount);

module.exports = orderRouter;
