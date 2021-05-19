const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/error");

const asyncHandler = require("../middleware/asyncHandler");

/* Lets make the controllers method for defferent routes now

@desc Get all bootcamps
 @route /api/v1/bootcamps/
@ access PUBLIC

Now listen instead of taking try and catch block on each method what we can do is
make a async handler and pass these function in tht

*/

/* I have kept one try and catch method as a refernce 
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({ succes: "true", data: bootcamps });
  } catch (err) {
    next(err);
  }
};
*/

exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find();
  res
    .status(200)
    .json({ succes: "true", count: Bootcamp.length, data: bootcamps });
});

// @desc Get Single bootcamp
//  @route /api/v1/bootcamps/:id
// @ access PUBLIC

/*
Refernce -->

exports.getBootcamp = async (req, res, next) => {
  // try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      console.log(21);
      return next(
        new ErrorResponse(`Bootcamp not found of id ${req.params.id}`, 404)
      );
    
    res.status(200).json({ succes: "true", data: bootcamp });
  } catch (err) {
    // res.status(400).json({ succes: false, data: null });
    console.log(23);
    // BY default it will send a 500 status and a html page with the error description
    next(err);
  }
};*/

exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    console.log(21);
    return next(
      new ErrorResponse(`Bootcamp not found of id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ succes: "true", data: bootcamp });
});

// @desc Post bootcamps
//  @route /api/v1/bootcamps/
// @ access Private

exports.postBootcamps = asyncHandler(async (req, res, next) => {
  const newBootCamp = await Bootcamp.create(req.body);
  res.status(200).json({ succes: "true", data: newBootCamp });
});

// @desc Update bootcamps
//  @route /api/v1/bootcamps/:id
// @ access Private

exports.updateBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found of id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ succes: true, data: bootcamp });
});

// @desc Delete bootcamps
//  @route /api/v1/bootcamps/:id
// @ access Private

exports.deleteBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndRemove(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found of id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ succes: true, data: {} });
});
