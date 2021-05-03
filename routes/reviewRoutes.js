const express = require("express");
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

const reviewRouter = express.Router({ mergeParams: true });

// 1. routes for everyone
reviewRouter
  .route("/")
  .get(reviewController.getReviews)
  .post(reviewController.createReview);

// 2. routes for admin
reviewRouter
  .route("/:id")
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = reviewRouter;
