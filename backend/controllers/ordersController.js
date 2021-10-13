const pool = require("../db")

//Create orders(Admin)
const createOrders =  async (req, res) => {
    try{
        const query = `insert into orders(pick_location, drop_location, pick_time, drop_time, response, customer_id, driver_id) values ($1,$2,$3,$4,$5,$6,$7) RETURNING *`
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
        const query = `select * from orders order by id desc`
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
        const query = `select * from orders where id = $1`
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
        const query = `update orders set pick_location = $1, drop_location = $2, pick_time = $3, drop_time = $4, response = $5, customer_id = $6, driver_id = $7 where id = $8 returning *`
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
        const query = `delete from orders where id = $1 returning *`
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
        const query = `update drivers set available = $1 where id = $2 returning *`
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
        const query = `SELECT * FROM drivers where available = true`
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
        const query = `select * from orders where response LIKE '' order by id desc`
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
        const query = `select * from orders where response LIKE 'Confirm' order by id desc`
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
        const query = `select * from orders where response LIKE 'Complete' order by id desc`
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
        const query = `select * from orders where response LIKE 'Reject' order by id desc`
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
        const query = `update orders set response = $1 where id = $2 returning *`
        const result = await pool.query(query, [req.body.response, req.params.id])
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
        const query = `insert into orders(pick_location, drop_location, pick_time, drop_time, response, id, driver_id) values ($1,$2,$3,$4,$5,$6,$7) RETURNING *`
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
        const query = `select * from orders where id = $1`
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
        const query = `update orders set pick_location = $1, drop_location = $2, pick_time = $3, drop_time = $4, response = $5, customer_id = $6, driver_id = $7 where id = $8 returning *`
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
        const query = `delete from orders where id = $1 returning *`
        const result = await pool.query(query, [req.params.id])
        console.log(result)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}



const driverSeeOrders =  async (req, res) => {
    try{
        const {id} = req.params
        const result = await pool.query("select * from orders where id = 1$",[id])
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

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
                  viewPendingOrders, viewConfirmOrders, viewCompleteOrders, viewRejectOrders,updateDriverResponse, customerCreateOrders, customerGetOrders,
                  customerUpdateOrders, customerDeleteOrders}