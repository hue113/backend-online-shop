const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const { promisify } = require("util");

const AppError = require("../utils/appError");
const User = require("../models/UserModel");
const Email = require("../utils/email");
const { catchAsync } = require("../utils/helpers");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = async (user, statusCode, req, res) => {
  console.log("createSendToken", user._id);
  const token = await signToken(user._id);
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // httpOnly: false, // this is for heroku set up
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    // sameSite: "none",
  });

  // Remove password from output (body)
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

// for everyone to sign up
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const url = `${req.protocol}://${req.get("host")}/me`;
  // const url = `${req.protocol}://localhost:3000/me`;
  // console.log(url);
  await new Email(newUser, url).sendWelcome();

  createSendToken(newUser, 201, req, res);
});

// for everyone to log in
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password");

  // check password by bcrypt.compare pass1234 === $2a$12$FqaTuRnuoO6yPow8QxUbluTis6
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, req, res);
});

// for everyone to log out
exports.logout = (req, res) => {
  // console.log("logout");
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    // expires: new Date(),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

// verify token to check authentication
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Get token and check if it exists
  let token;
  // read jwt from authorization headers (bearer token)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    // read jwt from cookies
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 2) Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // console.log('decoded', decoded);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    // iat means issued at
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

// for user to update password
exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select("+password");

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Your current password is wrong.", 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!
  // don't use update for anything related to password

  // 4) Log user in, send JWT
  createSendToken(user, 200, req, res);
});

// for user if they forget password - send a token to their email reset password
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with email address.", 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  // validateBeforeSave: false = deactivate all validators defined in our schema
  // (for easy testing purpose only)
  await user.save({ validateBeforeSave: false });

  // 3) Send token back to user's email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;
  // eslint-disable-next-line max-len
  // const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
  try {
    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    // validateBeforeSave: false = deactivate all validators defined in our schema
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

// for user - use token from email to reset password
exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  console.log("hashedToken", hashedToken);
  // console.log("req.params.token", req.params.token);
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  console.log("user", user);

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  // delete the resetToken password
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  createSendToken(user, 200, req, res);
});

// to restrict routes to specified roles only
exports.restrictTo = (...roles) => {
  // ...roles specified in routes
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

exports.checkLoggedIn = async (req, res, next) => {
  if (req.headers.authorization == undefined) {
    res.status(400).json({
      status: "error",
      message: "You're not logged in!",
    });
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer") &&
    req.headers.authorization.includes(undefined) == false
  ) {
    try {
      const token = req.headers.authorization.split("Bearer ")[1];
      // 1) verify token
      const decoded = await jwt_decode(token);

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        res.status(400).json({
          status: "error",
          message: "The user belonging to this token does no longer exist.",
        });
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        res.status(400).json({
          status: "error",
          message: "User recently changed password! Please log in again.",
        });
        // next();
      }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      // console.log(currentUser);
      // res.status(200).json({
      //   status: "success",
      //   message: "user found",
      //   data: {
      //     user: currentUser,
      //   },
      // });
      return next();
    } catch (err) {
      res.status(400).json({
        status: "error",
        message: "invalid token",
      });
    }
  } else {
    res.status(400).json({
      status: "error",
      message: "You are not logged in! Please log in to get access!",
    });
  }
  // next(); // need to return next() above because next() should be only called once
};
