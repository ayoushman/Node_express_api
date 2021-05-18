const mongoose = require("mongoose");

const EmailExpression =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const URLexpression =
  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name "],
    unique: true,
    trim: true,
    maxlength: [50, `Name cannot be more than be ${50} characters`],
  },

  slug: String,

  description: {
    type: String,
    required: [true, "Please add a description "],
    maxlength: [500, `Description cannot be more than be ${500} characters`],
  },
  website: {
    type: String,
    match: [URLexpression, "Please use a valid url"],
  },
  phone: {
    type: String,
    maxlength: [20, `Phone Number cannot be more than ${20} characters`],
  },
  email: {
    type: String,
    match: [EmailExpression, "Please use a valid a valid email"],
  },

  address: {
    type: String,
    required: [true, "Please Enter an valid Address"],
  },

  // GeoJson format
  /* location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
      index: "2dsphere",
    },
    // Stuff from the mapQuest API
    formattedAdress: String,
    street: String,
    city: String,
    State: String,
    zipcode: String,
    country: String,
  },*/
  careers: {
    type: [String],
    enum: [
      "Web Development",
      "Mobile Development",
      "UI/UX",
      "Data Science",
      "Business",
      "other",
    ],
  },
  averageRating: {
    type: Number,
    min: [1, "Rating must at least be 1 0"],
    max: [5, "Maximum Rating can be 5"],
  },

  averageCost: {
    type: Number,
  },
  photo: {
    type: String,
    default: "no-image.jpg",
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobAssitance: {
    type: Boolean,
    default: false,
  },
  jobGaurantee: {
    type: Boolean,
    default: false,
  },
  acceptGi: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Bootcamp", BootcampSchema);
