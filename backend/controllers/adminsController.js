const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../jwtGenerator/adminsJwtGenerator");


//Admin registration
const registerAdmins = async (req, res) => {
  const { full_name, email, phone_number, city, password } = req.body;
  try {
    const query1 = `SELECT * FROM admins WHERE email = $1`;
    const admin = await pool.query(query1, [email]);
    if (admin.rows.length > 0) {
      return res.status(200).json({done:true, message:"Admin already exist!"});
    }
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);
    const query2 = `INSERT INTO admins (full_name, email, phone_number, city, admin_password) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const newAdmin = await pool.query(query2, [
      full_name,
      email,
      phone_number,
      city,
      bcryptPassword,
    ]);

    const token = jwtGenerator(newAdmin.rows.length && newAdmin.rows[0].id);
    res.status(200).send({ done: true, token: token });
  } catch (err) {
    res.status(500).send({ done: false, message: "Something went wrong!" });
  }
};

//Admin login
const loginAdmins = async (req, res) => {
  try {
    const { email, password } = req.body;
    const query = `SELECT * FROM admins WHERE email = $1`;
    const admin = await pool.query(query, [email]);

    if (admin.rows.length === 0) {
      return res.status(401).json({done: false,  message:"Password or Email is incorrect"});
    }

    const validPassword = await bcrypt.compare(
      password,
      admin.rows[0].admin_password
    );

    if (!validPassword) {
      return res.status(401).json({done: false, message:"Password is incorrect"});
    }

    const token = jwtGenerator(admin.rows[0].id);
    res.status(200).send({ done: true, token: token });
  } catch (err) {
    res.status(500).send({ done: false, message: "Something went wrong!" });
  }
};

//Verify admin login or not
const verify = (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    res.status(500).send({ done: false, message: "Something went wrong!" });
  }
};

//Dashboard accessibility
const dashboard = async (req, res) => {
  try {
    const query = `SELECT * FROM admins WHERE id = $1`;
    const admin = await pool.query(query, [req.admin]);
    res.json(admin.rows[0]);
  } catch (err) {
    res.status(500).send({ done: false, message: "Something went wrong!" });
  }
};

//Create admin without authentication and hash password
const createAdmins = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, city, admin_password } = req.body;
    const array = [fullName, email, phoneNumber, city, admin_password];
    const query = `INSERT INTO admins(fullName, email, phoneNumber, city, admin_password) VALUES ($1,$2,$3,$4,$5)`;
    const result = await pool.query(query, array);
    const [data] = result.rows;
    res.status(200).send({ done: true, body: data });
  } catch (err) {
    res.status(500).send({ done: false, message: "Something went wrong!" });
  }
}

//Read admins
const getAdmins = async (req, res) => {
  try {
    const query = `SELECT * FROM admins`;
    const result = await pool.query(query);
    const data = result.rows;
    res.status(200).send({ done: true, body: data });
  } catch (err) {
    res.status(500).send({ done: false, message: "Something went wrong!" });
  }
};

//Read one admin
const getOneAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `SELECT * FROM admins WHERE id = $1`;
    const result = await pool.query(query, [id]);
    const [data] = result.rows;
    res.status(200).send({ done: true, body: data });
  } catch (err) {
    res.status(500).send({ done: false, message: "Something went wrong!" });
  }
};

//Update admin
const updateAdmins = async (req, res) => {
  const { password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);
    const query = `UPDATE admins SET full_name = $1, email = $2, phone_number = $3, city = $4, admin_password = $5 WHERE id = $6 RETURNING *`;
    const result = await pool.query(query, [
      req.body.full_name,
      req.body.email,
      req.body.phone_number,
      req.body.city,
      bcryptPassword,
      req.params.id,
    ]);
    const [data] = result.rows;
    res.status(200).send({ done: true, body: data });
  } catch (err) {
    res.status(500).send({ done: false, message: "Something went wrong!" });
  }
};

//Delete admin...
const deleteAdmins = async (req, res) => {
  try {
    const query = `DELETE FROM admins WHERE id = $1 RETURNING *`;
    const result = await pool.query(query, [req.params.id]);
    const [data] = result.rows;
    res.status(200).send({ done: true, body: data });
  } catch (err) {
    res.status(500).send({ done: false, message: "Something went wrong!" });
  }
};

module.exports = {
  registerAdmins,
  loginAdmins,
  verify,
  dashboard,
  createAdmins,
  getAdmins,
  getOneAdmin,
  updateAdmins,
  deleteAdmins,
};
