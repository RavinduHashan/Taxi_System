const pool = require("../db")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../jwtGenerator/usersJwtGenerator")

//Admin registration
const registerUsers =  async (req, res) => {
    const { full_name, email, phone_number, city, password } = req.body;
    try {
      const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      if (user.rows.length > 0) {
        return res.status(401).json("User already exist!");
      }
      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);
      const newUser = await pool.query("INSERT INTO users (full_name, email, phone_number, city, user_password) VALUES ($1, $2, $3, $4, $5) RETURNING *",[full_name, email, phone_number, city, bcryptPassword]);
      //res.json(newUser.rows[0])

      const token = jwtGenerator(newUser.rows[0].user_id);
      res.json({ token });  
    } 
    catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  };

//Admin login
const loginUsers = async (req, res) => {
  
  try {
    const { email, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (user.rows.length === 0) {
      return res.status(401).json("Password or Email is incorrect");
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
    
    if (!validPassword) {
      return res.status(401).json("Password or Email is incorrect");
    }
    
    const token = jwtGenerator(user.rows[0].user_id);
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

//Dashbord accessibility
const dashboard = async (req, res) =>{
  try{
      const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [req.user])
      res.json(user.rows[0])
  }
  catch(err){
      console.error(err.message)
      res.status(500).json("Server Error")
  }
}

//Create admin without athetication and hash password
const createUsers =  async (req, res) => {
    try{
        const result = await pool.query("insert into users(fullName, email, phoneNumber, city, usersPassword) values ($1,$2,$3,$4,$5)" ,
        [req.body.fullName, req.body.email, req.body.phoneNumber, req.body.city, req.body.usersPassword,])
        console.log(result)
        res.status(201).json({
            status: "Success",
            date: {users: "Ravindu"}
        })
    }
    catch(err){
        console.log(err);
    }
}

//Read admins
const getUsers =  async (req, res) => {
    try{
        const result = await pool.query("select * from users order by user_id desc")
        console.log(result)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

//Read one admin
const getOneUser =  async (req, res) => {
    try{
        const {user_id} = req.params;
        const result = await pool.query("select * from users where user_id = $1", [user_id])
        console.log(result)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

//Update admin
const updateUsers = async (req, res) => {
    const { password } = req.body;
    try{
        const salt = await bcrypt.genSalt(10);
        const Bpassword = await bcrypt.hash(password, salt);
        const result = await pool.query("update users set full_name = $1, email = $2, phone_number = $3, city = $4, user_password = $5 where user_id = $6 returning *" ,
        [req.body.full_name, req.body.email, req.body.phone_number, req.body.city, Bpassword, req.params.user_id])
        console.log(result)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

//Delete admin
const deleteUsers = async (req, res) => {
    try{
        const result = await pool.query("delete from users where user_id = $1 returning *", [req.params.user_id])
        console.log(result)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {registerUsers, loginUsers, verify, dashboard, createUsers, getUsers, getOneUser, updateUsers, deleteUsers}