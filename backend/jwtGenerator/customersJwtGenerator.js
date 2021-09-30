const jwt = require("jsonwebtoken")
require("dotenv").config()

function jwtGenerator(customer_id){
    const payload = {customer: customer_id};
    return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1hr" });
  }  

module.exports = jwtGenerator;