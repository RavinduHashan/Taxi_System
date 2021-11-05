const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header("token");

    if (!jwtToken) {
      return res.status(200).json({done: false, message:"Not Authorization"});
    }
    const payload = jwt.verify(jwtToken, process.env.jwtSecret);
    req.customer = payload.customer;
  } catch (err) {
    console.error(err.message);
    return res.status(200).json({done: false, message:"Not Authorize"});
  }
  next();
};
