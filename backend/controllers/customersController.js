const pool = require("../db")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../jwtGenerator/customersJwtGenerator")



const registerCustomers =  async (req, res) => {
    const { full_name, email, phone_number, city, password } = req.body;
    try {
      const customer = await pool.query("SELECT * FROM customers WHERE email = $1", [email]);
      if (customer.rows.length > 0) {
        return res.status(401).json("Customer already exist!");
      }
      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);
      const newCustomer = await pool.query("INSERT INTO customers (full_name, email, phone_number, city, customer_password) VALUES ($1, $2, $3, $4, $5) RETURNING *",[full_name, email, phone_number, city, bcryptPassword]);
      //res.json(newUser.rows[0])

      const token = jwtGenerator(newCustomer.rows[0].customer_id);
      res.json({ token });  
    } 
    catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  };
 
const loginCustomers = async (req, res) => {
  
  try {
    const { email, password } = req.body;
    const customer = await pool.query("SELECT * FROM customers WHERE email = $1", [email]);

    if (customer.rows.length === 0) {
      return res.status(401).json("Password or Email is incorrect");
    }

    const validPassword = await bcrypt.compare(password, customer.rows[0].customer_password);
    //console.log(validPassword)
    
    if (!validPassword) {
      return res.status(401).json("Password or Email is incorrect");
    }
    
    const token = jwtGenerator(customer.rows[0].customer_id);
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
      const customer = await pool.query("SELECT * FROM customers WHERE customer_id = $1", [req.customer])
      res.json(customer.rows[0])
  }
  catch(err){
      console.error(err.message)
      res.status(500).json("Server Error")
  }
}

/**
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
**/
const getCustomers =  async (req, res) => {
    try{
        const result = await pool.query("select * from customers")
        console.log(result)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

const getOneCustomer =  async (req, res) => {
    try{
        const {customer_id} = req.params;
        const result = await pool.query("select * from customers where customer_id = $1", [customer_id])
        console.log(result)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

const updateCustomers = async (req, res) => {
    const { password } = req.body;
    try{
        const salt = await bcrypt.genSalt(10);
        const Bpassword = await bcrypt.hash(password, salt);
        const result = await pool.query("update customers set full_name = $1, email = $2, phone_number = $3, city = $4, customer_password = $5 where customer_id = $6 returning *" ,
        [req.body.full_name, req.body.email, req.body.phone_number, req.body.city, Bpassword, req.params.customer_id])
        console.log(result)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

const deleteCustomers = async (req, res) => {
    try{
        const result = await pool.query("delete from customers where customer_id = $1 returning *", [req.params.customer_id])
        console.log(result)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {registerCustomers,loginCustomers, verify, dashboard, getCustomers, getOneCustomer, updateCustomers, deleteCustomers}