const pool = require("../db")

//Create orders(Admin)
const createOrders =  async (req, res) => {
    try{
        const query = `INSERT INTO orders(pick_location, drop_location, pick_time, drop_time, response, customer_id, driver_id) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`
        const {pick_location, drop_location, pick_time, drop_time, response, customer_id, driver_id} = req.body
        const result = await pool.query( query, [pick_location, drop_location, pick_time, drop_time, response, customer_id, driver_id])
        res.json(result)   
    }
    catch(err){
        console.log(err);
    }
}

//Read orders(Admin)
const getOrders =  async (req, res) => {
    try{
        const query = `select *, (SELECT full_name FROM customers WHERE id = customer_id) AS customer_name,
                                 (SELECT full_name FROM drivers WHERE id = driver_id) AS driver_name 
                                 from orders ORDER BY created DESC;`
        const result = await pool.query(query)
        console.log(result)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

//Read one order(Admin)
const getOneOrder =  async (req, res) => {
    try{
        const {id} = req.params;
        const query = `SELECT * FROM orders WHERE id = $1`
        const result = await pool.query(query, [id])
        console.log(result)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

//Update orders(Admin)
const updateOrders = async (req, res) => {
    try{
        const query = `UPDATE orders SET pick_location = $1, drop_location = $2, pick_time = $3, drop_time = $4, response = $5, customer_id = $6, driver_id = $7 WHERE id = $8 RETURNING *`
        const result = await pool.query(query, [req.body.pick_location, req.body.drop_location, req.body.pick_time, req.body.drop_time, req.body.response, req.body.customer_id, req.body.driver_id, req.params.id])
        console.log(result)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

//Delete orders(Admin)
const deleteOrders = async (req, res) => {
    try{
        const query = `DELETE FROM orders WHERE id = $1 RETURNING *`
        const result = await pool.query(query, [req.params.id])
        console.log(result)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}


//Update availability of a driver(Admin)
const updateAvailableState = async (req, res) => {
    try{
        const query = `UPDATE drivers SET available = $1 WHERE id = $2 RETURNING *`
        const result = await pool.query(query, [req.body.available, req.params.id])
        res.json(result)  
    }
    catch(err){
        console.log(err);

    }
}

//Read available drivers(Admin)
const seeAvailableDrivers =  async (req, res) => {
    try{
        const query = `SELECT * FROM drivers WHERE available = true`
        const result = await pool.query(query)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}


//Read pending orders(Admin)
const viewPendingOrders = async (req, res) => {
    try{
        const query = `SELECT *, (SELECT full_name FROM customers WHERE id = customer_id) AS customer_name,
                                 (SELECT full_name FROM drivers WHERE id = driver_id) AS driver_name 
                                 FROM orders where response LIKE ''`
        const result = await pool.query(query)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

//Read confirm orders(Admin)
const viewConfirmOrders = async (req, res) => {
    try{
        const query = `SELECT *, (SELECT full_name FROM customers WHERE id = customer_id) AS customer_name,
                                 (SELECT full_name FROM drivers WHERE id = driver_id) AS driver_name 
                                 FROM orders WHERE response LIKE 'Confirm' `
        const result = await pool.query(query)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

//Read complete orders(Admin)
const viewCompleteOrders = async (req, res) => {
    try{
        const query = `SELECT *, (SELECT full_name FROM customers WHERE id = customer_id) AS customer_name,
                                 (SELECT full_name FROM drivers WHERE id = driver_id) AS driver_name 
                                 FROM orders WHERE response LIKE 'Complete'`
        const result = await pool.query(query)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

//Read reject orders(Admin)
const viewRejectOrders = async (req, res) => {
    try{
        const query = `SELECT *, (SELECT full_name FROM customers WHERE id = customer_id) AS customer_name,
                                 (SELECT full_name FROM drivers WHERE id = driver_id) AS driver_name 
                                 FROM orders WHERE response LIKE 'Reject' `
        const result = await pool.query(query)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

//Driver response the order
const updateDriverResponse = async (req, res) => {
    try{
        const query = `UPDATE orders SET response = $1 WHERE id = $2 RETURNING *`
        const result = await pool.query(query, [req.body.response, req.params.id])
        res.json(result)  
    }
    catch(err){
        console.log(err);

    }
}

//Driver make available
const insertTrue = async (req, res) => {
    try{
        const query = `UPDATE drivers SET available = true WHERE id = $1 RETURNING *`
        const result = await pool.query(query, [req.params.id])
        res.json(result)  
    }
    catch(err){
        console.log(err);

    }
}

//Driver make unavailable
const insertFalse = async (req, res) => {
    try{
        const query = `UPDATE drivers SET available = false WHERE id = $1 RETURNING *`
        const result = await pool.query(query, [req.params.id])
        res.json(result)  
    }
    catch(err){
        console.log(err);

    }
}

const insertConfirm = async (req, res) => {
    try{
        const query = `UPDATE orders SET response = 'Confirm' WHERE id = $1 RETURNING *`
        const result = await pool.query(query, [req.params.id])
        res.json(result)  
    }
    catch(err){
        console.log(err);

    }
}

const insertReject = async (req, res) => {
    try{
        const query = `UPDATE orders SET response = 'Reject' WHERE id = $1 RETURNING *`
        const result = await pool.query(query, [req.params.id])
        res.json(result)  
    }
    catch(err){
        console.log(err);

    }
}

const insertComplete = async (req, res) => {
    try{
        const query = `UPDATE orders SET response = 'Complete' WHERE id = $1 RETURNING *`
        const result = await pool.query(query, [req.params.id])
        res.json(result)  
    }
    catch(err){
        console.log(err);

    }
}
//****************************************************************************************************
// //Customer

//Create trips(Customer)
const customerCreateOrders = async (req, res) =>{
    try{
        const {pick_location, drop_location, pick_time, drop_time, response, driver_id} = req.body
        const {id} = req.params
        const query = `INSERT INTO orders(pick_location, drop_location, pick_time, drop_time, response, id, driver_id) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`
        const result = await pool.query(query, [pick_location, drop_location, pick_time, drop_time, response, id, driver_id])
        res.json(result)   
    }
    catch(err){
        console.log(err)
    }
}

//Get trips(Customer)
const customerGetOrders = async (req, res) =>{
    try{
        const {id} = req.params
        const query = `SELECT * FROM orders WHERE id = $1`
        const result = await pool.query(query, [id])
        res.json(result)   
    }
    catch(err){
        console.log(err)
    }
}

//Update trips(Customer)
const customerUpdateOrders = async (req, res) => {
    try{
        const query = `UPDATE orders SET pick_location = $1, drop_location = $2, pick_time = $3, drop_time = $4, response = $5, customer_id = $6, driver_id = $7 WHERE id = $8 RETURNING *`
        const result = await pool.query(query, [req.body.pick_location, req.body.drop_location, req.body.pick_time, req.body.drop_time, req.body.response, req.body.c_id, req.body.d_id, req.params.id])
        console.log(result)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

//Delete trips(Customer)
const customerDeleteOrders = async (req, res) => {
    try{
        const query = `DELETE FROM orders WHERE id = $1 RETURNING *`
        const result = await pool.query(query, [req.params.id])
        console.log(result)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}



// const driverSeeOrders =  async (req, res) => {
//     try{
//         const {id} = req.params
//         const result = await pool.query("select * from orders where id = 1$",[id])
//         res.json(result)
//     }
//     catch(err){
//         console.log(err);
//     }
// }

// const driverResponseOrder = async (req, res) => {
//     try{
//         const {response, order_id} = req.body
//         const result = await pool.query("update orders set  response = $1 where order_id = $2 returning *" [response, order_id])
//         res.json(result)
//     }
//     catch(err){
//         console.log(err);
//     }
// }

// const userSeeOrders =  async (req, res) => {
//     try{
//         const {user_id} = req.body
//         const result = await pool.query("select * from orders u_id = $1", [user_id])
//         res.json(result)
//     }
//     catch(err){
//         console.log(err);
//     }
// }

// const deleteOrders = async (req, res) => {
//     try{
//         const result = await pool.query("delete from users where user_id = $1 returning *", [req.params.user_id])
//         console.log(result)
//         res.json(result)
//     }
//     catch(err){
//         console.log(err);
//     }
// }

module.exports = {createOrders, getOrders, getOneOrder, updateOrders, deleteOrders, updateAvailableState, seeAvailableDrivers,
                  viewPendingOrders, viewConfirmOrders, viewCompleteOrders, viewRejectOrders,updateDriverResponse,insertTrue,insertFalse,
                  insertConfirm, insertReject, insertComplete, customerCreateOrders, customerGetOrders,
                  customerUpdateOrders, customerDeleteOrders}