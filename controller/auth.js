const ErrorResponse = require("../utils/error");
const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/User");

// @description User registrtion
// @route Post /api/v1/auth/register
//@ access public

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  console.log(user);

  //   Create Token
  sendTokenResponse(user, 200, res);
});

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate emil & password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  sendTokenResponse(user, 200, res);
});

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000
    ) /**Cokkies expiration date  */,
    httpOnly: true,
  };

  res
    .status(statusCode)
    .cookies("token", token, options)
    .json({ success: true, token: token });
};
