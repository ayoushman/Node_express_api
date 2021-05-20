const Course = require("../models/Course");
const ErrorResponse = require("../utils/error");
const asyncHandler = require("../middleware/asyncHandler");

/*  @desc Get all bootcamps
 @route /api/v1/bootcamps/:bootcampsId/courses
@ access PUBLIC
 */

// Now for populating courses with the bootcamp data we just need to
// add to function of  populate to find and give bootcamp as an parameter
// if we want populate with only some selected fields we need to send the path and select values
// this was easy now it will be the hard part where we need to show array of courses inside the bootcamps
// For that we will be needing virtuals
exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.bootcampId) {
    // query = Course.find({ bootcamp: req.params.bootcampId }).populate(
    //   "bootcamp"
    // );

    // for specific values from bootcamp

    query = Course.find({ bootcamp: req.params.bootcampId }).populate({
      path: "bootcamp",
      select: "name description",
    });
  } else {
    query = Course.find().populate("bootcamp").populate({
      path: "bootcamp",
      select: "name description",
    });
  }

  const courses = await query;

  res.status(200).json({ success: true, count: courses.length, data: courses });
});
