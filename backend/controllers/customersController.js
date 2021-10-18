const pool = require("../db")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../jwtGenerator/customersJwtGenerator")


//Customer registration
const registerCustomers =  async (req, res) => {
    const { full_name, email, phone_number, city, password } = req.body;
    try {
      const query1 = `SELECT * FROM customers WHERE email = $1`
      const customer = await pool.query(query1, [email]);
      if (customer.rows.length > 0) {
        return res.status(401).json("Customer already exist!");
      }
      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);
      const query2 = `INSERT INTO customers (full_name, email, phone_number, city, customer_password) VALUES ($1, $2, $3, $4, $5) RETURNING *`
      const newCustomer = await pool.query(query2, [full_name, email, phone_number, city, bcryptPassword]);
      //res.json(newUser.rows[0])

      const token = jwtGenerator(newCustomer.rows[0].id);
      res.json({ token });  
    } 
    catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  };
 
//Customer login  
const loginCustomers = async (req, res) => {
  
  try {
    const { email, password } = req.body;
    const query = `SELECT * FROM customers WHERE email = $1`
    const customer = await pool.query(query, [email]);

    if (customer.rows.length === 0) {
      return res.status(401).json("Password or Email is incorrect");
    }

    const validPassword = await bcrypt.compare(password, customer.rows[0].customer_password);
    //console.log(validPassword)
    
    if (!validPassword) {
      return res.status(401).json("Password or Email is incorrect");
    }
    
    const token = jwtGenerator(customer.rows[0].id);
    res.json({ token });

    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

//Verify customer login or not
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
      const query = `SELECT * FROM customers WHERE id = $1`
      const customer = await pool.query(query, [req.customer])
      res.json(customer.rows[0])
  }
  catch(err){
      console.error(err.message)
      res.status(500).json("Server Error")
  }
}


//Create Customer without athetication and hash password
const createCustomers =  async (req, res) => {
    try{
        const query = `INSERT INTO users(fullName, email, phoneNumber, city, usersPassword) values ($1,$2,$3,$4,$5)`
        const result = await pool.query(query, [req.body.fullName, req.body.email, req.body.phoneNumber, req.body.city, req.body.usersPassword,])
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

//Read customers
const getCustomers =  async (req, res) => {
    try{
        const query = "SELECT * FROM customers"
        const result = await pool.query(query)
        console.log(result)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

//Read one customer
const getOneCustomer =  async (req, res) => {
    try{
        const {id} = req.params;
        const query = `SELECT * FROM customers WHERE id = $1`
        const result = await pool.query(query, [id])
        console.log(result)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

//Update customers
const updateCustomers = async (req, res) => {
    const { password } = req.body;
    try{
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);
        const query = `UPDATE customers SET full_name = $1, email = $2, phone_number = $3, city = $4, customer_password = $5 WHERE id = $6 RETURNING *`
        const result = await pool.query(query, [req.body.full_name, req.body.email, req.body.phone_number, req.body.city, bcryptPassword, req.params.id])
        console.log(result)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

//Delete customers
const deleteCustomers = async (req, res) => {
    try{
        const query = `DELETE FROM customers WHERE id = $1 RETURNING *`
        const result = await pool.query(query, [req.params.id])
        console.log(result)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {registerCustomers,loginCustomers, verify, dashboard,createCustomers, getCustomers, getOneCustomer, updateCustomers, deleteCustomers}