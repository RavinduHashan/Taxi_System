const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../jwtGenerator/customersJwtGenerator");
const request = require('postman-request');

//OTP Registration
const createCustomers = async (req, res) => {
  try {
    const {phone_number} = req.body;
    const query1 = `SELECT * FROM customers WHERE phone_number = $1`;
    const result1 = await pool.query(query1, [phone_number]);
    if (result1.rows.length != 0 ) {
        const otp = Math.floor(Math.random() * (9999 - 1000) + 1000);
        const id = result1.rows[0].id;
        const query2 = `UPDATE customers SET otp = $1 WHERE id = $2 RETURNING *`;
        const result2 = await pool.query(query2, [otp, id]);
        const token = jwtGenerator(result2.rows.length && result2.rows[0].id);
        request(`https://www.textit.biz/sendmsg?id=94123456789&pw=1234&to=${phone_number}&text=${result1.rows[0].otp}`,
        function (error, response, body) {
        res.status(200).send({done: true, token:token, data:result2.rows, error:error, statusCode:response && response.statusCode, body:body});
      })
    }
    else{
      const otp = Math.floor(Math.random() * (9999 - 1000) + 1000);
      const query4 = `INSERT INTO customers (phone_number, otp) VALUES ($1, $2) RETURNING *`;
      const result4 = await pool.query(query4, [phone_number, otp]);
      const query5 = `SELECT * FROM customers WHERE phone_number = $1`;
      const result5 = await pool.query(query5, [phone_number]);
      const token = jwtGenerator(result4.rows.length && result4.rows[0].id);
      request(`https://www.textit.biz/sendmsg?id=94123456789&pw=1234&to=${phone_number}&text=${result5.rows[0].otp}`, 
      function (error, response, body) {
      res.status(200).send({done: true, token:token, data:result5.rows, error:error, statusCode:response && response.statusCode, body:body});
      })
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).send({ done: false, message: "Something went wrong!" });
  }
}

//OTP Login
const otpLogin = async (req, res) => {
  try {
    const { phone_number, otp } = req.body;
    const query = `SELECT * FROM customers WHERE phone_number = $1`;
    const customer = await pool.query(query, [phone_number]);

    if (customer.rows.length === 0) {
      return res.status(200).json({done:false, message:"Phone Number is incorrect"});
    }
   
    if (otp == customer.rows[0].otp) {
      const token = jwtGenerator(customer.rows[0].id);
      res.status(200).send({ done: true, token: token });
    }
    else{
      res.status(200).send({ done: true, message: "OTP is incorrect"});
    }
    
  } catch (err) {
    console.log(err);
    res.status(500).send({ done: false, message: "Something went wrong!" });
  }
}

//UpdateCustomerData
const updateCustomerData = async (req, res) => {
  try {
    const query = `UPDATE customers SET full_name = $1, email = $2, city = $3, updated = now() WHERE id = $4 RETURNING *`;
    const result = await pool.query(query, [
      req.body.full_name,
      req.body.email,
      req.body.city,
      req.params.id,
    ]);
    const [data] = result.rows;
    res.status(200).send({ done: true, body: data });
  } catch (err) {
    res.status(500).send({ done: false, message: "Something went wrong!" });
  }
};

//Verify customer login or not
const verify = (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    res.status(500).send({ done: false, message: "Something went wrong!" });
  }
};

//Dashbord accessibility
const dashboard = async (req, res) => {
  try {
    const query = `SELECT * FROM customers WHERE id = $1`;
    const customer = await pool.query(query, [req.customer]);
    res.json(customer.rows[0]);
  } catch (err) {
    res.status(500).send({ done: false, message: "Something went wrong!" });
  }
};


//Read customers
const getCustomers = async (req, ress) => {
  try {
    const query = "SELECT * FROM customers";
    const result = await pool.query(query);
    const data = result.rows;
    ress.status(200).send({ done: true, body: data });
  } catch (err) {
    res.status(500).send({ done: false, message: "Something went wrong!" });
  }
};

//Read one customer
const getOneCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `SELECT * FROM customers WHERE id = $1`;
    const result = await pool.query(query, [id]);
    const [data] = result.rows;
    res.status(200).send({ done: true, body: data });
  } catch (err) {
    res.status(500).send({ done: false, message: "Something went wrong!" });
  }
};

//Delete customers
const deleteCustomers = async (req, res) => {
  try {
    const query = `DELETE FROM customers WHERE id = $1 RETURNING *`;
    const result = await pool.query(query, [req.params.id]);
    const [data] = result.rows;
    res.status(200).send({ done: true, body: data });
  } catch (err) {
    res.status(500).send({ done: false, message: "Something went wrong!" });
  }
};

module.exports = {
  verify,
  dashboard,
  createCustomers,
  otpLogin,
  updateCustomerData,
  getCustomers,
  getOneCustomer,
  deleteCustomers,
};
