const jwt = require("jsonwebtoken")
require("dotenv").config()

function jwtGenerator(driver_id){
    const payload = {driver: driver_id};
    return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1hr" });
  }  

module.exports = jwtGenerator;