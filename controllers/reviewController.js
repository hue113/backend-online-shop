const Review = require("../models/ReviewModel");
const AppError = require("../utils/appError");
const { catchAsync } = require("../utils/helpers");

// for everyone to create review
exports.createReview = catchAsync(async (req, res, next) => {
  const data = await Review.create(req.body);

  res.status(200).json({
    status: "success",
    data: data,
  });
});

// for admin to get reviews
exports.getReviews = catchAsync(async (req, res, next) => {
  if (req.params.productId) {
    const productReviews = await Review.find({
      product: req.params.productId,
    }).sort({ createdAt: 1 });

    res.status(200).json({
      status: "success",
      results: productReviews.length,
      data: productReviews,
    });
  }

  const data = await Review.find();

  res.status(200).json({
    status: "success",
    results: data.length,
    data: data,
  });
});

// for admin to get review
exports.getReview = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const data = await Review.findById(id);

  if (!data) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    results: data.length,
    data: data,
  });
});

// for admin to update review
exports.updateReview = catchAsync(async (req, res, next) => {
  const doc = await Review.findByIdAndUpdate(
    req.params.id,
    {
      review: req.body.review,
      rating: req.body.rating,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

// for admin to delete review
exports.deleteReview = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const data = await Review.findByIdAndDelete(id);

  res.status(200).json({
    status: "success",
    results: data.length,
    data: data,
  });
});
