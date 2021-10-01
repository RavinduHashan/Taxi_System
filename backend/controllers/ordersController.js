
const pool = require("../db")

const createOrders =  async (req, res) => {
    try{
        const {pick_location, drop_location, pick_time, drop_time, response, u_id, d_id} = req.body
        const result = await pool.query("insert into orders(pick_location, drop_location, pick_time, drop_time, response, u_id, d_id) values ($1,$2,$3,$4,$5,$6,$7) RETURNING *" ,
        [pick_location, drop_location, pick_time, drop_time, response, u_id, d_id])
        res.json(result)   
    }
    catch(err){
        console.log(err);
    }
}

const getOrders =  async (req, res) => {
    try{
        const result = await pool.query("select * from orders")
        console.log(result)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

const getOneOrder =  async (req, res) => {
    try{
        const {order_id} = req.params;
        const result = await pool.query("select * from orders where order_id = $1", [order_id])
        console.log(result)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

const updateOrders = async (req, res) => {
    
    try{
        const result = await pool.query("update orders set pick_location = $1, drop_location = $2, pick_time = $3, drop_time = $4, response = $5, u_id = $6, d_id = $7 where order_id = $8 returning *" ,
        [req.body.pick_location, req.body.drop_location, req.body.pick_time, req.body.drop_time, req.body.response, req.body.u_id, req.body.d_id, req.params.order_id])
        console.log(result)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

const deleteOrders = async (req, res) => {
    try{
        const result = await pool.query("delete from orders where order_id = $1 returning *", [req.params.order_id])
        console.log(result)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}


//**************************************************************************

const viewPendingOrders = async (req, res) => {
    try{
        const result = await pool.query("select * from orders where response LIKE '' ")
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}


const viewConfirmOrders = async (req, res) => {
    try{
        const result = await pool.query("select * from orders where response LIKE 'Confirm' ")
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}


const viewCompleteOrders = async (req, res) => {
    try{
        const result = await pool.query("select * from orders where response LIKE 'Complete' ")
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

const viewRejectOrders = async (req, res) => {
    try{
        const result = await pool.query("select * from orders where response LIKE 'Reject' ")
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

const createOnlineState = async (req, res) => {
    try{
        const {driver_id} = req.body
        const result = await pool.query("insert into online_drivers(o_d_id) values ($1) RETURNING *", [driver_id])
        res.json(result)  
    }
    catch(err){
        console.log(err);

    }
}

const removeOnlineState = async (req, res) => {
    try{
        const {driver_id} = req.body
        const result = await pool.query("delete from users where o_d_id = $1 returning *", [driver_id])
        res.json(result)  
    }
    catch(err){
        console.log(err);

    }
}

const seeOnlineDrivers =  async (req, res) => {
    try{
        const result = await pool.query("select * from online_drivers")
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

const driverSeeOrders =  async (req, res) => {
    try{
        const {driver_id} = req.body
        const result = await pool.query("select * from orders where d_id = 1$",[driver_id])
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

const userSeeOrders =  async (req, res) => {
    try{
        const {user_id} = req.body
        const result = await pool.query("select * from orders u_id = $1", [user_id])
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

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

module.exports = {createOrders, getOrders, getOneOrder, updateOrders, deleteOrders,
                  viewPendingOrders, viewConfirmOrders, viewCompleteOrders, viewRejectOrders, 
                  createOnlineState,removeOnlineState, seeOnlineDrivers,driverSeeOrders, userSeeOrders}