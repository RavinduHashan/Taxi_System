const pool = require("../db")

//Create orders(Admin)
const createOrders =  async (req, res) => {
    try{
        const {pick_location, drop_location, pick_time, drop_time, response, c_id, d_id} = req.body
        const result = await pool.query("insert into orders(pick_location, drop_location, pick_time, drop_time, response, c_id, d_id) values ($1,$2,$3,$4,$5,$6,$7) RETURNING *" ,
        [pick_location, drop_location, pick_time, drop_time, response, c_id, d_id])
        res.json(result)   
    }
    catch(err){
        console.log(err);
    }
}

//Read orders(Admin)
const getOrders =  async (req, res) => {
    try{
        const result = await pool.query("select * from orders order by order_id desc")
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
        const {order_id} = req.params;
        const result = await pool.query("select * from orders where order_id = $1", [order_id])
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
        const result = await pool.query("update orders set pick_location = $1, drop_location = $2, pick_time = $3, drop_time = $4, response = $5, c_id = $6, d_id = $7 where order_id = $8 returning *" ,
        [req.body.pick_location, req.body.drop_location, req.body.pick_time, req.body.drop_time, req.body.response, req.body.c_id, req.body.d_id, req.params.order_id])
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
        const result = await pool.query("delete from orders where order_id = $1 returning *", [req.params.order_id])
        console.log(result)
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

//Driver make available(Admin)
const createOnlineState = async (req, res) => {
    try{
        const {o_d_id} = req.body
        const result = await pool.query("insert into online_drivers(o_d_id) values ($1) returning *", [o_d_id])
        res.json(result)  
    }
    catch(err){
        console.log(err);

    }
}

//Driver make offline(Admin)
const removeOnlineState = async (req, res) => {
    try{
        const result = await pool.query("delete from online_drivers where online_driver_id = $1 returning *", [req.params.online_driver_id])
        res.json(result)  
    }
    catch(err){
        console.log(err);

    }
}

//Update availability of a driver(Admin)
const updateOnlineState = async (req, res) => {
    try{
        const result = await pool.query("update online_drivers set o_d_id = $1 where online_driver_id = $2 returning *" , [req.body.o_d_id, req.params.online_driver_id])
        res.json(result)  
    }
    catch(err){
        console.log(err);

    }
}

//Read available drivers(Admin)
const seeOnlineDrivers =  async (req, res) => {
    try{
        const result = await pool.query("select * from online_drivers order by online_driver_id desc")
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}


//Read pending orders(Admin)
const viewPendingOrders = async (req, res) => {
    try{
        const result = await pool.query("select * from orders where response LIKE '' ")
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

//Read confirm orders(Admin)
const viewConfirmOrders = async (req, res) => {
    try{
        const result = await pool.query("select * from orders where response LIKE 'Confirm' ")
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

//Read complete orders(Admin)
const viewCompleteOrders = async (req, res) => {
    try{
        const result = await pool.query("select * from orders where response LIKE 'Complete' ")
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}

//Read reject orders(Admin)
const viewRejectOrders = async (req, res) => {
    try{
        const result = await pool.query("select * from orders where response LIKE 'Reject' ")
        res.json(result)
    }
    catch(err){
        console.log(err);
    }
}


//****************************************************************************************************

//Create trip(User)
const userCreateOrders = async (req, res) =>{
    try{
        const result = await pool.query("insert into orders")
    }
    catch(err){
        console.log(err)
    }
}



// const driverSeeOrders =  async (req, res) => {
//     try{
//         const {driver_id} = req.body
//         const result = await pool.query("select * from orders where d_id = 1$",[driver_id])
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

module.exports = {createOrders, getOrders, getOneOrder, updateOrders, deleteOrders, createOnlineState,
                  removeOnlineState, updateOnlineState, seeOnlineDrivers,viewPendingOrders, viewConfirmOrders, 
                  viewCompleteOrders, viewRejectOrders}