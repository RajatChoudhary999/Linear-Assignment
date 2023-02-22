const generateToken = require("../config/generateToken");
const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const bcrypt = require("bcrypt");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!(name && email && password)) {
    res.status(400);
    throw new Error("Please Enter All the Feilds");
  }

  try {
    const userExists = await User.findOne({ where: { email: email } });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists Please Login");
    }
  } catch (error) {
    throw new Error(error.message);
  }

  //Create User
  try {
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      // console.log("User Created: ", user);
      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } else {
      throw new Error("Failed to Create the User");
    }
  } catch (error) {
    res.status(400).send("Failed to create user: " + error.message);
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email: email } });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = {
  registerUser,
  authUser,
};
