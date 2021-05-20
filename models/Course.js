const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please enter a valid title "],
  },

  description: {
    type: String,
    required: [true, "Please add a description"],
  },

  weeks: {
    type: String,
    required: [true, "Please add number of weeks"],
  },

  tuition: {
    type: Number,
    required: [true, "please add the amount"],
  },

  minimumSkill: {
    type: String,
    required: [true, "Please enter your current skill level"],
    enum: ["beginner", "intermediate", "Professional"],
  },

  scholarshipAvailable: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  /*   Now since courses will be connected to bootcamps therefore we must add them 
as a special field and for type we need special mongoose type
*/

  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true,
  },
});

module.exports = mongoose.model("Course", CourseSchema);
