const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../../middleware/generateToken");
const logger = require("../../config/logger");
const User = require("../../models/User");

//registration
const registerUser = expressAsyncHandler(async (req, res) => {
  const { email, firstname, lastname, password } = req?.body;
  // console.log(req?.body);
  const userExists = await User.findOne({ email }); // handle custom error handlers outside catch.
  if (userExists) throw new Error("User Exists");
  try {
    // const userExists = await User.findOne({ email });

    // if (userExists) {
    //   res.json("User Exists");
    // } else {
    // console.log(req.body);
    const user = await User.create({ email, firstname, lastname, password });
    res.status(200).json({ msg: "User Created" });
    logger.info("Register");
    // console.log("User created");
  } catch (error) {
    logger.info("Registration error");
    res.json(error);
  }
});

//fetch all users from the database
const fetchAllUsers = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.json({ error: error.message });
  }
});

//logins
const loginuser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req?.body;
  const userFound = await User.findOne({ email });

  //check password
  if (userFound && (await userFound.isPasswordMatch(password))) {
    logger.info("Login");
    res.json({
      id: userFound?._id,
      email: userFound?.email,
      firstname: userFound?.firstname,
      lastname: userFound?.lastname,
      token: generateToken(userFound?._id),
    });

  } else {
    res.status(401);
    logger.info("Login error");
    throw new Error("Invalid User Credentials!");
  }
});

module.exports = { registerUser, fetchAllUsers, loginuser };
