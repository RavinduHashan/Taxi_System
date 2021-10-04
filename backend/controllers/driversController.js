const pool = require("../db")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../jwtGenerator/driversJwtGenerator")



const registerDrivers =  async (req, res) => {
    const { full_name, email, phone_number, vehicle_type, vehicle_number, city, password } = req.body;
    try {
      const driver = await pool.query("SELECT * FROM drivers WHERE email = $1", [email]);
      if (driver.rows.length > 0) {
        return res.status(401).json("Driver already exist!");
      }
      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);
      const newDriver = await pool.query("INSERT INTO drivers (full_name, email, phone_number,vehicle_type,vehicle_number, city, driver_password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",[full_name, email, phone_number, vehicle_type, vehicle_number, city, bcryptPassword]);
      //res.json(newUser.rows[0])

      const token = jwtGenerator(newDriver.rows[0].driver_id);
      res.json({ token });  
    } 
    catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  };
 
const loginDrivers = async (req, res) => {
  
  try {
    const { email, password } = req.body;
    const driver = await pool.query("SELECT * FROM drivers WHERE email = $1", [email]);

    if (driver.rows.length === 0) {
      return res.status(401).json("Password or Email is incorrect");
    }

    const validPassword = await bcrypt.compare(password, driver.rows[0].driver_password);
    //console.log(validPassword)
    
    if (!validPassword) {
      return res.status(401).json("Password or Email is incorrect");
    }
    
    const token = jwtGenerator(driver.rows[0].driver_id);
    res.json({ token });

    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const verify =  (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};


const dashboard = async (req, res) =>{
  try{
      //res.json(req.user)
      const driver = await pool.query("SELECT * FROM drivers WHERE driver_id = $1", [req.driver])
      res.json(driver.rows[0])
  }
  catch(err){
      console.error(err.message)
      res.status(500).json("Server Error")
  }
}

/**
const createDrivers =  async (req, res) => {
    try{
        const result = await pool.query("insert into drivers(fullName, email, phoneNumber,vehicle_type, vehicle_number, city, driver_Password) values ($1,$2,$3,$4,$5,$6,$7)" ,
        [req.body.fullName, req.body.email, req.body.phoneNumber,req.body.vehicle_type, req.body.vehicle_number, req.body.city, req.body.driver_Password])
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
**/
const getDrivers =  async (req, res) => {
    try{
        const result = await pool.query("select * from drivers")
        console.log(result)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

const getOneDriver =  async (req, res) => {
    try{
        const {driver_id} = req.params;
        const result = await pool.query("select * from drivers where driver_id = $1", [driver_id])
        console.log(result)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

const updateDrivers = async (req, res) => {
    try{
        const result = await pool.query("update drivers set full_name = $1, email = $2, phone_number = $3, vehicle_type = $4, vehicle_number = $5, city = $6, driver_password = $7 where driver_id = $8 returning *" ,
        [req.body.full_name, req.body.email, req.body.phone_number, req.body.vehicle_type, req.body.vehicle_number, req.body.city, req.body.password, req.params.driver_id])
        console.log(result)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

const deleteDrivers = async (req, res) => {
    try{
        const result = await pool.query("delete from drivers where driver_id = $1 returning *", [req.params.driver_id])
        console.log(result)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}



module.exports = {registerDrivers,loginDrivers, verify, dashboard, getDrivers, getOneDriver, updateDrivers, deleteDrivers}