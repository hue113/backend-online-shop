const path = require("path");
const express = require("express");
const enforce = require("express-sslify");
const morgan = require("morgan");
// var cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cors = require("cors");

const productRouter = require("./routes/productRoutes");
const shopRouter = require("./routes/shopRoutes");
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

// const env = "development";
const env = "production";

// app.use(cors());

app.use(
  cors({
    origin: env === "development" ? "http://localhost:4000" : "*",
    credentials: "true",
    exposedHeaders: ["set-cookie"],
  })
);

// Parse Cookie Header
// app.use(cookieParser());
// Data sanitization against NoSQL query injection (clean characters: $, .)
app.use(mongoSanitize());
// Data sanitization against XSS (prevent js code inside html)
app.use(xss());

// Development logging
if (env === "development") app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (env === "production") {
  app.use(enforce.HTTPS({ trustProtoHeader: true })); // PWA HTTPS
  app.use(express.static("client/build"));

  app.get("/", function (req, res) {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use("/api/v1/products", productRouter);
app.use("/api/v1/shops", shopRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/reviews", reviewRouter);

// Error Handling
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`));
});

// Global Error Handler
app.use(globalErrorHandler);

module.exports = app;
