// review / rating / createdAt / ref to tour / ref to user
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, "Review can not be empty!"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "products",
    required: [true, "Review must belong to a product."],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: [true, "Review must belong to a user"],
  },
});

reviewSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  const { _id: id, ...result } = object;
  return { ...result, id };
});

// combination of tour-user must be unique
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  });
  this.populate({
    path: "product",
    select: "name category image sku",
  });

  next();
});

// Calculate Average Rating on Product
reviewSchema.statics.calcAverageRatings = async function (productId) {
  const stats = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: "$product",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  console.log("stats", stats);

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      // set default
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

// ko dung pre-save --> vi current review is not in the database yet
reviewSchema.post("save", function () {
  // this points to current review
  // this.constructor.calcAverageRatings(this.tour);
});

reviewSchema.post(/^findOneAnd/, async (doc) => {
  // if (doc) await doc.constructor.calcAverageRatings(doc.tour);
});

const Review = mongoose.model("reviews", reviewSchema);

module.exports = Review;
