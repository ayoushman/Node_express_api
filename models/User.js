const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET =
  "dshfihaewuhfawehinsaijncjns0"; /**RANDOM STRING DONT THINK ABOUT IT  */
const JWT_EXPIRE = "30d";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  role: {
    type: String,
    enum: ["user", "publisher"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false /**Will not return the password when user is calling the api  */,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password using bcrypt

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(
    10
  ); /**Here 10 is a round ,  more the rounds more secure is the psassword but  more 
heavier on the system */

  this.password = await bcrypt.hash(this.password, salt);
});

// Remeber its a model therefore it will be called on the instance of the actual model
// and not the on the model, for calling a function on the model itself we use statics
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });
};

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model("User", UserSchema);
