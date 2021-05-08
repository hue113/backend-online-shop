const Product = require("../models/ProductModel");
const Shop = require("../models/ShopModel");
const { catchAsync } = require("../utils/helpers");

// for everyone to get products
exports.getProducts = catchAsync(async (req, res, next) => {
  // get shop products (can be either by category name or by category id)
  if (req.params.categoryId) {
    switch (req.params.categoryId) {
      case "popular":
        const popularProducts = await Product.find()
          .sort({ saleCount: -1 })
          .limit(8);
        res.status(200).json({
          status: "success",
          results: popularProducts.length,
          data: popularProducts,
        });
        break;
      case "featured":
        const featuredProducts = await Product.find({ isFeatured: true });
        res.status(200).json({
          status: "success",
          results: featuredProducts.length,
          data: featuredProducts,
        });
        break;
      case "new":
        const newProducts = await Product.find({ isNewItem: true });
        res.status(200).json({
          status: "success",
          results: newProducts.length,
          data: newProducts,
        });
        break;

      case "sale":
        const products = await Product.find();
        var saleVariations = [];
        products.map((i) => {
          return i.variation.map((el) =>
            el.discount === 0
              ? ""
              : saleVariations.push({
                  id: i.id,
                  sku: i.sku,
                  name: `${i.name} - ${el.color}`,
                  price: i.price,
                  isSale: true,
                  offerEnd: i.offerEnd,
                  isNewItem: i.isNewItem,
                  isFeatured: i.isFeatured,
                  rating: i.rating,
                  saleCount: i.saleCount,
                  category: i.category,
                  tag: i.tag,
                  variation: [
                    {
                      color: el.color,
                      image: el.image,
                      price: el.price,
                      discount: el.discount,
                      size: el.size,
                    },
                  ],
                  image: i.image,
                  shortDescription: i.shortDescription,
                  fullDescription: i.fullDescription,
                })
          );
        });
        res.status(200).json({
          status: "success",
          results: saleVariations.length,
          data: saleVariations,
        });
        break;

      case "women":
      case "men":
      case "kids":
      case "accessories":
      case "new-arrivals":
        const category = await Shop.find({ slug: req.params.categoryId });
        const categoryProducts = await Product.find({
          category: category[0]._id,
        });

        res.status(200).json({
          status: "success",
          results: categoryProducts.length,
          data: categoryProducts,
        });
        break;

      // default: get shop products by shop category id
      default:
        const data = await Product.find({ category: req.params.categoryId });
        res.status(200).json({
          status: "success",
          results: data.length,
          data: data,
        });
    }
  }
  // get all products
  else {
    const data = await Product.find();
    res.status(200).json({
      status: "success",
      results: data.length,
      data: data,
    });
  }
});

// // for everyone to get product
exports.getProduct = catchAsync(async (req, res, next) => {
  const data = await Product.findById(req.params.id);

  if (!data) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: data,
  });
});

// for everyone to get product by url
exports.getProductByUrl = catchAsync(async (req, res, next) => {
  const searchTerms = req.params.name.replace(/-/g, " ").split(".");
  const data = await Product.aggregate([
    {
      $addFields: {
        name: { $toString: "$name" },
        id: "$_id",
      },
    },
    {
      $match: {
        // name: { $regex: `${searchTerms[0]}`, $options: "i" },
        sku: { $regex: `${searchTerms[1]}`, $options: "s" },
      },
    },
  ]).exec();

  res.status(200).json({
    status: "success",
    data: data,
  });
});

// for admin to create products
exports.createProduct = catchAsync(async (req, res, next) => {
  const data = await Product.create(req.body);

  res.status(200).json({
    status: "success",
    data: data,
  });
});

// for admin to update products
exports.updateProduct = catchAsync(async (req, res, next) => {
  const data = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!data) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: data,
  });
});

// for admin to delete products
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const data = await Product.findByIdAndDelete(id);

  res.status(200).json({
    status: "success",
    results: data.length,
    data: data,
  });
});
