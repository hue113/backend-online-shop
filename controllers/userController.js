// const multer = require('multer');
// const sharp = require('sharp');
// const jwt_decode = require("jwt-decode");

const User = require("../models/UserModel");
const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");
const Review = require("../models/ReviewModel");

const AppError = require("../utils/appError");
const { catchAsync, filterObj } = require("../utils/helpers");

// for admin to get users
exports.getUsers = catchAsync(async (req, res, next) => {
  const data = await User.find();

  res.status(200).json({
    status: "success",
    results: data.length,
    data: data,
  });
});

// for user to get their user id
exports.getMe = (req, res, next) => {
  // console.log(req.user);
  req.params.id = req.user.id;
  next();
};

// for admin to get user
exports.getUser = catchAsync(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: user,
  });
});

// for admin to create user
exports.createUser = catchAsync(async (req, res, next) => {
  const data = await User.create(req.body);

  res.status(200).json({
    status: "success",
    data: data,
  });
});

// for admin to update user info (only general info, not password)
exports.updateUser = catchAsync(async (req, res, next) => {
  // if (req.body.password !== req.body.passwordConfirm) {
  //   return next(new AppError("Passwords are not the same", 404));
  // }

  // const password = await bcrypt.hash(req.body.password, 12);
  // req.body.password = password;
  // req.body.passwordConfirm = password;

  const data = await User.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true, runValidators: true }
  );

  if (!data) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: data,
  });
});

// for admin to delete user
exports.deleteUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const data = await User.findByIdAndDelete(id);

  res.status(200).json({
    status: "success",
    results: data.length,
    data: data,
  });
});

exports.checkEmail = catchAsync(async (req, res, next) => {
  const checkEmailExisted = await User.find({ email: req.params.email });

  res.status(200).json({
    status: "success",
    data: checkEmailExisted.length,
  });
});

// for user; update email, name, address only & not for updating password
exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword.",
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, "name", "email", "address");
  if (req.file) filteredBody.photo = req.file.filename;

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

// for user to delete their account --> only set active: false
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

// for user to get their orders
exports.getMyOrders = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const data = await Order.find({ user: id })
    .populate({
      path: "items",
      populate: { path: "product" },
    })
    .sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    result: data.length,
    data: data,
  });
});

// for user to get delete order (for orders with pending status only)
exports.deleteMyOrder = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const orderId = req.params.orderId;
  const data = await Order.find({
    user: id,
    _id: orderId,
  });

  if (data.length === 0) {
    return next(new AppError("No document found with that ID", 404));
  } else if (data && data.pop().status !== "Pending") {
    return next(
      new AppError(
        "Document with that ID has been processed and cannot be deleted",
        404
      )
    );
  }
  const deleteOrder = await Order.findOneAndDelete({
    user: id,
    _id: orderId,
    status: "Pending",
  });

  res.status(200).json({
    status: "success",
    result: deleteOrder.length,
    data: deleteOrder,
  });
});

// for user to get their reviews
exports.getMyReviews = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const data = await Review.find({ user: id }).sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    result: data.length,
    data: data,
  });
});

// for user to delete their reviews
exports.deleteMyReview = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const reviewId = req.params.reviewId;
  const data = await Review.findOneAndDelete({ user: id, _id: reviewId });

  if (!data) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    result: data.length,
    data: data,
  });
});

// for user to update their reviews
exports.updateMyReview = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const reviewId = req.params.reviewId;
  const data = await Review.findOneAndUpdate(
    { user: id, _id: reviewId },
    { review: req.body.review, rating: req.body.rating },
    { new: true, runValidators: true }
  );

  if (!data) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    result: data.length,
    data: data,
  });
});
