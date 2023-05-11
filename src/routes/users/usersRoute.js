const {
  registerUser,
  fetchAllUsers,
  loginuser,
} = require("../../controllers/users/userctlr");
const express = require("express");

const userRoute = express.Router();
userRoute.post("/register", registerUser);
userRoute.post("/login", loginuser);
userRoute.get("/", fetchAllUsers);
module.exports = userRoute;
