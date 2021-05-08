const mongoose = require("mongoose");

const orderItemSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },
  size: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

// orderItemSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "product",
//     select: "name category image sku variation",
//   });

//   next();
// });

const OrderItem = mongoose.model("order_items", orderItemSchema);

module.exports = OrderItem;
