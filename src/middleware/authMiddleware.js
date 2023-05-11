const jwt = require("jsonwebtoken");
const User = require("../models/User");
const expressAsyncHandler = require("express-async-handler");

const auth = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req?.headers?.authorization?.split(":")[1];
    // console.log("token" + token);
    try {
      if (token) {
        const userID = jwt.verify(token, process.env.JWT_KEY);
        // console.log(userID);
        const user = await User.findById(userID?.id);
        req.user = user;

        next();
      }
    } catch (error) {
      throw new Error(error.message);
    }
  } else {
    throw new Error("No token attached");
  }
});

module.exports = auth;
