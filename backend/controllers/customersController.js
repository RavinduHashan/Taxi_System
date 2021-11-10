const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../jwtGenerator/customersJwtGenerator");
const request = require('postman-request');

//Customer registration
const registerCustomers = async (req, res) => {
  const { full_name, email, phone_number, city, password } = req.body;
  try {
    const query1 = `SELECT * FROM customers WHERE email = $1`;
    const customer = await pool.query(query1, [email]);
    if (customer.rows.length > 0) {
      return res.status(200).json({done:false , message:"Customer already exist!"});
    }
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);
    const query2 = `INSERT INTO customers (full_name, email, phone_number, city, customer_password) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const newCustomer = await pool.query(query2, [
      full_name,
      email,
      phone_number,
      city,
      bcryptPassword,
    ]);

    const token = jwtGenerator(
      newCustomer.rows.length && newCustomer.rows[0].id
    );
    res.status(200).send({ done: true, token: token });
  } catch (err) {
    res.status(500).send({ done: false, message: "Something went wrong!" });
  }
};

//Customer login
const loginCustomers = async (req, res) => {
  try {
    const { email, password } = req.body;
    const query = `SELECT * FROM customers WHERE email = $1`;
    const customer = await pool.query(query, [email]);

    if (customer.rows.length === 0) {
      return res.status(200).json({done:false, message:"Password or Email is incorrect"});
    }
    const validPassword = await bcrypt.compare(
      password,
      customer.rows[0].customer_password
    );
    if (!validPassword) {
      return res.status(200).json({done:false, message:"Password or Email is incorrect"});
    }
    const token = jwtGenerator(customer.rows[0].id);
    res.status(200).send({ done: true, token: token });
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

//Sent otp to customer

//Create Customer without authentication and hash password
const createCustomers = async (req, res) => {
  try {
    const {phone_number} = req.body;
    const query1 = `SELECT * FROM customers WHERE phone_number = $1`;
    const result1 = await pool.query(query1, [phone_number]);
    const id = result1.rows[0].id;
    const otp = Math.floor(Math.random() * (9999 - 1000) + 1000);
    if (result1.rows.length > 0 ) {
        const query2 = `UPDATE customers SET otp = $1 WHERE id = $2 RETURNING *`;
        const result2 = await pool.query(query2, [otp, id]);
        request(`https://www.textit.biz/sendmsg?id=94123456789&pw=1234&to=${phone_number}&text=${result1.rows[0].otp}`, function (error, response, body) {
        res.status(200).json({ data:result2.rows, error:error, statusCode:response && response.statusCode, body:body});
      })
    }
    else{
      const query4 = `INSERT INTO customers (phone_number, otp) VALUES ($1, $2) RETURNING *`;
      const result4 = await pool.query(query4, [phone_number, otp]);
      request(`https://www.textit.biz/sendmsg?id=94123456789&pw=1234&to=${phone_number}&text=${result1.rows[0].otp}`, function (error, response, body) {
      res.status(200).json({ data:result2.rows, error:error, statusCode:response && response.statusCode, body:body});
      })
    }
  }
  catch (err) {
    res.status(500).send({ done: false, message: "Something went wrong!" });
  }
}


//Read customers
const getCustomers = async (req, res) => {
  try {
    const query = "SELECT * FROM customers";
    const result = await pool.query(query);
    const data = result.rows;
    res.status(200).send({ done: true, body: data });
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

//Update customers
const updateCustomers = async (req, res) => {
  const { password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);
    const query = `UPDATE customers SET full_name = $1, email = $2, phone_number = $3, city = $4, customer_password = $5 WHERE id = $6 RETURNING *`;
    const result = await pool.query(query, [
      req.body.full_name,
      req.body.email,
      req.body.phone_number,
      req.body.city,
      bcryptPassword,
      req.params.id,
    ]);
    const [data] = result.rows;
    console.log(data);
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
  registerCustomers,
  loginCustomers,
  verify,
  dashboard,
  createCustomers,
  getCustomers,
  getOneCustomer,
  updateCustomers,
  deleteCustomers,
};
