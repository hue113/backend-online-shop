const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: {
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "order_items",
        required: [true, "Order must have at least one item!"],
      },
    ],
    validate: {
      validator: function () {
        return !(this.items.length < 1);
      },
      message: `Order must have at least one item!`,
    },
  },

  // {
  //   product: {
  //     type: mongoose.Schema.ObjectId,
  //     ref: "Product",
  //     required: [true, "Order must have at least one item!"],
  //   },
  //   size: String,
  //   color: String,
  //   quantity: String,
  // },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  total: Number,
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
  shippingAddress: {
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    addressLine: {
      type: String,
      required: true,
    },
    postal: {
      type: String,
      required: true,
      trim: true,
      maxlength: 6,
    },
  },
  phone: {
    type: String,
    validate: {
      validator: function (phone) {
        return phone.length === 10;
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "User phone number required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

orderSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  const { _id: id, ...result } = object;
  return { ...result, id };
});

const Order = mongoose.model("orders", orderSchema);

module.exports = Order;
