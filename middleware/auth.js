// This middelware will be used to protect the routes
const jwt = require("jsonwebtoken"); /**TO verify the token */

const asyncHandler = require("./asyncHandler");
const ErrorResponse = require("../utils/error");
const User = require("../models/User");
