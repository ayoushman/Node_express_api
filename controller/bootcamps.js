const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/error");

//  Lets make the controllers method for defferent routes now

// @desc Get all bootcamps
//  @route /api/v1/bootcamps/
// @ access PUBLIC

// Now listen instead of taking try and catch block on each method what we can do is
// make a async handler and pass these function in tht
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({ succes: "true", data: bootcamps });
  } catch (err) {
    next(err);
  }
};

// @desc Get Single bootcamp
//  @route /api/v1/bootcamps/:id
// @ access PUBLIC

exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      console.log(21);
      return next(
        new ErrorResponse(`Bootcamp not found of id ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ succes: "true", data: bootcamp });
  } catch (err) {
    // res.status(400).json({ succes: false, data: null });
    console.log(23);
    // BY default it will send a 500 status and a html page with the error description
    next(err);
  }
};

// @desc Post bootcamps
//  @route /api/v1/bootcamps/
// @ access Private
exports.postBootcamps = async (req, res, next) => {
  try {
    const newBootCamp = await Bootcamp.create(req.body);
    res.status(200).json({ succes: "true", data: newBootCamp });
  } catch (error) {
    next(error);
  }
};

// @desc Update bootcamps
//  @route /api/v1/bootcamps/:id
// @ access Private

exports.updateBootcamps = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

// @desc Delete bootcamps
//  @route /api/v1/bootcamps/:id
// @ access Private

exports.deleteBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndRemove(req.params.id);
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found of id ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ succes: true, data: {} });
  } catch (error) {
    next(error);
  }
};
