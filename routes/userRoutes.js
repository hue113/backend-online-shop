const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const orderRouter = require("./orderRoutes");

const userRouter = express.Router();

userRouter.use("/:userId/orders", orderRouter);

// 1. routes for everyone
userRouter.post("/signup", authController.signup);
userRouter.post("/login", authController.login);
userRouter.get("/logout", authController.logout);
userRouter.post("/forgotPassword", authController.forgotPassword);
userRouter.patch("/resetPassword/:token", authController.resetPassword);
userRouter.get("/checkemail/:email", userController.checkEmail);

// 2. routes require authentication for user
userRouter.use(authController.protect);
userRouter.get("/me", userController.getMe, userController.getUser);
userRouter.patch("/updateMe", userController.updateMe);
userRouter.patch("/updatePassword", authController.updatePassword);
userRouter.delete("/deleteMe", userController.deleteMe);
userRouter.get("/my-orders", userController.getMe, userController.getMyOrders);
userRouter.delete(
  "/my-orders/:orderId",
  userController.getMe,
  userController.deleteMyOrder
);
userRouter.get(
  "/my-reviews",
  userController.getMe,
  userController.getMyReviews
);
userRouter
  .route("/my-reviews/:reviewId")
  .patch(userController.getMe, userController.updateMyReview)
  .delete(userController.getMe, userController.deleteMyReview);

// 3. routes restricted to Admin role
userRouter.use(authController.restrictTo("admin"));
userRouter
  .route("/")
  .get(userController.getUsers)
  .post(userController.createUser);
userRouter
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRouter;
