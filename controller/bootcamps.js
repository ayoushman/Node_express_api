const Bootcamp = require("../models/Bootcamp");

//  Lets make the controllers method for defferent routes now

// @desc Get all bootcamps
//  @route /api/v1/bootcamps/
// @ access PUBLIC

exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({ succes: "true", data: bootcamps });
  } catch (err) {
    res.status(400).json({ succes: false, data: null });
  }
};

// @desc Get Single bootcamp
//  @route /api/v1/bootcamps/:id
// @ access PUBLIC

exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    res.status(200).json({ succes: "true", data: bootcamp });
  } catch (err) {
    res.status(400).json({ succes: false, data: null });
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
    res.status(400).json({ succes: false, data: null });
  }
};

// @desc Update bootcamps
//  @route /api/v1/bootcamps/:id
// @ access Private

exports.updateBootcamps = async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bootcamp) {
    res.status(400).json({ succes: false });
  }
  res.status(200).json({ succes: true, data: bootcamp });
};

// @desc Delete bootcamps
//  @route /api/v1/bootcamps/:id
// @ access Private

exports.deleteBootcamps = async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndRemove(req.params.id);
  if (!bootcamp) {
    res.status(404).json({ success: false });
  }
  res.status(200).json({ succes: true, data: {} });
};
