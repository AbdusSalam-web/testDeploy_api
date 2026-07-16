const { Schema, model } = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtKey } = require("../config");
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.generateToken = async function () {
  const user = this;
  try {
    return  jwt.sign(
      {
        userName: user.userName,
        email: user.email,
        userID: user._id,
        // exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60,
      },
      jwtKey,
      {
        expiresIn: '1d',
      },
    );
  } catch (error) {
    console.log(error.message);
    throw error; // Throw it so your controller's catch block can handle it
  }
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) next();
  else {
    const saltRound = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, saltRound);
  }
});

const User = model("User", userSchema);
module.exports = User;
