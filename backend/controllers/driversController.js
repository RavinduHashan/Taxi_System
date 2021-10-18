const pool = require("../db")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../jwtGenerator/driversJwtGenerator");
const { query } = require("express");


//Driver registration
const registerDrivers =  async (req, res) => {
    const { full_name, email, phone_number, vehicle_type, vehicle_number, city, password} = req.body;
    try {
      const query1 = `SELECT * FROM drivers WHERE email = $1`
      const driver = await pool.query(query1, [email]);
      if (driver.rows.length > 0) {
        return res.status(401).json("Driver already exist!");
      }
      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);
      const query2 = `INSERT INTO drivers (full_name, email, phone_number,vehicle_type,vehicle_number, city, driver_password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`
      const newDriver = await pool.query(query2, [full_name, email, phone_number, vehicle_type, vehicle_number, city, bcryptPassword]);
      //res.json(newUser.rows[0])

      const token = jwtGenerator(newDriver.rows[0].id);
      res.json({ token });  
    } 
    catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  };

  //Driver login
const loginDrivers = async (req, res) => {
  
  try {
    const query = `SELECT * FROM drivers WHERE email = $1`
    const { email, password } = req.body;
    const driver = await pool.query(query, [email]);

    if (driver.rows.length === 0) {
      return res.status(401).json("Password or Email is incorrect");
    }

    const validPassword = await bcrypt.compare(password, driver.rows[0].driver_password);
    
    if (!validPassword) {
      return res.status(401).json("Password or Email is incorrect");
    }
    
    const token = jwtGenerator(driver.rows[0].id);
    res.json({ token });

    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

//Vefify drivers login or not
const verify =  (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

//Dashboard accessability
const dashboard = async (req, res) =>{
  try{
      const query =  `SELECT * FROM drivers WHERE id = $1`
      const driver = await pool.query(query, [req.driver])
      res.json(driver.rows[0])
  }
  catch(err){
      console.error(err.message)
      res.status(500).json("Server Error")
  }
}

//Create drivers without authentication and hash password
const createDrivers =  async (req, res) => {
    try{
        const query = `INSERT INTO drivers(fullName, email, phoneNumber,vehicle_type, vehicle_number, city, driver_Password) VALUES ($1,$2,$3,$4,$5,$6,$7)`
        const result = await pool.query(query, [req.body.fullName, req.body.email, req.body.phoneNumber,req.body.vehicle_type, req.body.vehicle_number, req.body.city, req.body.driver_Password])
        console.log(result)
        res.status(201).json({
            status: "Success",
            date: {drivers: "Ravindu"}
        })
    }
    catch(err){
        console.log(err);
    }
}

//Read drivers
const getDrivers =  async (req, res) => {
    try{
        const query = `SELECT * FROM drivers`
        const result = await pool.query(query)
        console.log(result)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

//Read one driver
const getOneDriver =  async (req, res) => {
    try{
        const {id} = req.params;
        const query = `SELECT * FROM drivers WHERE id = $1`
        const result = await pool.query(query, [id])
        console.log(result)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

//Update drivers
const updateDrivers = async (req, res) => {
    const { password } = req.body;
    try{
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);
        const query = `UPDATE drivers SET full_name = $1, email = $2, phone_number = $3, vehicle_type = $4, vehicle_number = $5, city = $6, driver_password = $7 where id = $8 RETURNING *`
        const result = await pool.query(query, [req.body.full_name, req.body.email, req.body.phone_number, req.body.vehicle_type, req.body.vehicle_number, req.body.city, bcryptPassword, req.params.id])
        console.log(result)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}


//Delete drivers
const deleteDrivers = async (req, res) => {
    try{
        const query = `DELETE FROM drivers WHERE id = $1 RETURNING *`
        const result = await pool.query(query, [req.params.id])
        console.log(result)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}



module.exports = {registerDrivers,loginDrivers, verify, dashboard, createDrivers, getDrivers, getOneDriver, updateDrivers, deleteDrivers}