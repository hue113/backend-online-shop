const Shop = require("../models/ShopModel");
const { catchAsync } = require("../utils/helpers");

// for everyone to get shops
exports.getShops = catchAsync(async (req, res, next) => {
  const data = await Shop.find();

  res.status(200).json({
    status: "success",
    results: data.length,
    data: data,
  });
});

// for everyone to get shop
exports.getShop = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const data = await Shop.findById(id);

  if (!data) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    results: data.length,
    data: data,
  });
});

// for admin to update shop
exports.updateShop = catchAsync(async (req, res, next) => {
  const doc = await Shop.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

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

// for admin to create shop
exports.createShop = catchAsync(async (req, res, next) => {
  const data = await Shop.create(req.body);

  res.status(200).json({
    status: "success",
    data: data,
  });
});

// for admin to delete shop
exports.deleteShop = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const data = await Shop.findByIdAndDelete(id);

  res.status(200).json({
    status: "success",
    results: data.length,
    data: data,
  });
});
