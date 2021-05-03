// const Stripe = require("stripe");
const Order = require("../models/OrderModel");
const OrderItem = require("../models/OrderItemModel");
const { catchAsync } = require("../utils/helpers");

// for everyone to create order
exports.createOrder = catchAsync(async (req, res) => {
  const orderItemsIds = Promise.all(
    req.body.items.map(async (orderItem) => {
      let newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.product,
        color: orderItem.color,
        size: orderItem.size,
      });
      newOrderItem = await newOrderItem.save();
      return newOrderItem._id;
    })
  );
  const orderItemsIdsResolved = await orderItemsIds;
  // console.log(orderItemsIdsResolved);
  const totalPrices = await Promise.all(
    orderItemsIdsResolved.map(async (orderItemId) => {
      const orderItem = await OrderItem.findById(orderItemId).populate(
        "product"
      );
      const colorPrice = orderItem.product.variation.find(
        (el) => el.color === orderItem.color
      ).price;
      // const totalPrice = orderItem.product.price * orderItem.quantity;
      const totalPrice = Number(colorPrice) * orderItem.quantity;
      return totalPrice;
    })
  );
  const total = totalPrices.reduce((a, b) => a + b, 0);

  const order = await Order.create({
    items: orderItemsIdsResolved,
    shippingAddress: req.body.shippingAddress,
    phone: req.body.phone,
    total: total,
    user: req.body.user,
  });

  if (!order) return res.status(400).send("the order cannot be created!");

  res.send(order);
});

// for admin to get order
exports.getOrder = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const data = await Order.findById(id);

  res.status(200).json({
    status: "success",
    data: data,
  });
});

// for admin to get orders
exports.getOrders = catchAsync(async (req, res, next) => {
  console.log(req.params);
  if (req.params.userId) {
    const id = req.params.userId;
    const data = await Order.find({ user: id });

    res.status(200).json({
      status: "success",
      result: data.length,
      data: data,
    });
  }

  const data = await Order.find();

  res.status(200).json({
    status: "success",
    data: data,
  });
});

// for admin to update order
exports.updateOrder = catchAsync(async (req, res, next) => {
  const data = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!data) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: data,
  });
});

// for admin to delete order
exports.deleteOrder = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const data = await Order.findByIdAndDelete(id);

  res.status(200).json({
    status: "success",
    results: data.length,
    data: data,
  });
});

// for admin to get total sales
exports.getTotalSales = catchAsync(async (req, res) => {
  const totalSales = await Order.aggregate([
    { $group: { _id: null, totalsales: { $sum: "$total" } } },
  ]);

  if (!totalSales) {
    return res.status(400).send("The order sales cannot be generated");
  }

  res.send({ totalsales: totalSales.pop().totalsales }); // format totalsales
});

// for admin to get order count
exports.getOrderCount = catchAsync(async (req, res) => {
  const orderCount = await Order.countDocuments((count) => count);

  if (!orderCount) {
    res.status(500).json({ success: false });
  }
  res.send({
    orderCount: orderCount,
  });
});
