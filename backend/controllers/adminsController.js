const pool = require("../db")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../jwtGenerator/adminsJwtGenerator")

//Admin registration
const registerAdmins =  async (req, res) => {
    const { full_name, email, phone_number, city, password } = req.body;
    try {
      const query1 = `SELECT * FROM admins WHERE email = $1`
      const admin = await pool.query(query1, [email]);
      if (admin.rows.length > 0) {
        return res.status(401).json("Admin already exist!");
      }
      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);
      const query2 = `INSERT INTO admins (full_name, email, phone_number, city, admin_password) VALUES ($1, $2, $3, $4, $5) RETURNING *`
      const newAdmin = await pool.query(query2, [full_name, email, phone_number, city, bcryptPassword]);

      const token = jwtGenerator(newAdmin.rows[0].id);
      res.json({ token });  
    } 
    catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  };

//Admin login
const loginAdmins = async (req, res) => {
  
  try {
    const { email, password } = req.body;
    const query = `SELECT * FROM admins WHERE email = $1`
    const admin = await pool.query(query, [email]);

    if (admin.rows.length === 0) {
      return res.status(401).json("Password or Email is incorrect");
    }

    const validPassword = await bcrypt.compare(password, admin.rows[0].admin_password);
    
    if (!validPassword) {
      return res.status(401).json("Password or Email is incorrect");
    }
    
    const token = jwtGenerator(admin.rows[0].id);
    res.json({ token });

    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

//Verify admin login or not
const verify =  (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

//Dashboard accessibility
const dashboard = async (req, res) =>{
  try{
      const query = `SELECT * FROM admins WHERE id = $1`
      const admin = await pool.query(query, [req.admin])
      res.json(admin.rows[0])
  }
  catch(err){
      console.error(err.message)
      res.status(500).json("Server Error")
  }
}

//Create admin without authentication and hash password
const createAdmins =  async (req, res) => {
    try{
        const {fullName, email, phoneNumber, city , admin_password} = req.body
        const array = [fullName, email, phoneNumber, city, admin_password]
        const query = `insert into admins(fullName, email, phoneNumber, city, admin_password) values ($1,$2,$3,$4,$5)`
        const result = await pool.query( query, array)
        console.log(result)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

//Read admins
const getAdmins =  async (req, res) => {
    try{
        const query = `select * from admins order by id desc`
        const result = await pool.query(query)
        console.log(result)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

//Read one admin
const getOneAdmin =  async (req, res) => {
    try{
        const {id} = req.params;
        const query = `select * from admins where id = $1`
        const result = await pool.query(query, [id])
        console.log(result)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

//Update admin
const updateAdmins = async (req, res) => {
    const { password } = req.body;
    try{
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);
        const query = `update admins set full_name = $1, email = $2, phone_number = $3, city = $4, admin_password = $5 where id = $6 returning *`
        const result = await pool.query(query, [req.body.full_name, req.body.email, req.body.phone_number, req.body.city, bcryptPassword, req.params.id])
        console.log(result)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

//Delete admin
const deleteAdmins = async (req, res) => {
    try{
        const query = `delete from admins where id = $1 returning *`
        const result = await pool.query(query, [req.params.id])
        console.log(result)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {registerAdmins, loginAdmins, verify, dashboard, createAdmins, getAdmins, getOneAdmin, updateAdmins, deleteAdmins}