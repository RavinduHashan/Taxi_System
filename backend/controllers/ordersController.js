const pool = require("../db");

//Create orders(Admin)
const createOrders = async (req, res) => {
  try {
    const query = `INSERT INTO orders(pick_location, drop_location, pick_time, drop_time, response, customer_id, driver_id) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`;
    const {
      pick_location,
      drop_location,
      pick_time,
      drop_time,
      response,
      customer_id,
      driver_id,
    } = req.body;
    const result = await pool.query(query, [
      pick_location,
      drop_location,
      pick_time,
      drop_time,
      response,
      customer_id,
      driver_id,
    ]);
    const [data] = result.rows;
    res.status(200).send({ done: true, body: data });
  } catch (err) {
    res.status(500).send({ done: false, message: "Something went wrong!" });
  }
};

//Read orders(Admin)
const getOrders = async (req, res) => {
  try {
    const query = `SELECT *, (SELECT full_name FROM customers WHERE id = customer_id) AS customer_name,
                                 (SELECT full_name FROM drivers WHERE id = driver_id) AS driver_name 
                                 from orders ORDER BY created DESC;`;
    const result = await pool.query(query);
    const data = result.rows;
    res.status(200).send({ done: true, body: data });
  } catch (err) {
    res.status(500).send({ done: false, message: "Something went wrong!" });
  }
};

//Read one order(Admin)
const getOneOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `SELECT * FROM orders WHERE id = $1`;
    const result = await pool.query(query, [id]);
    const [data] = result.rows;
    res.status(200).send({ done: true, body: data });
  } catch (err) {
    res.status(500).send({ done: false, message: "Something went wrong!" });
  }
};

//Update orders(Admin)
const updateOrders = async (req, res) => {
  try {
    const query = `UPDATE orders SET pick_location = $1, drop_location = $2, pick_time = $3, drop_time = $4, response = $5, customer_id = $6, driver_id = $7 WHERE id = $8 RETURNING *`;
    const result = await pool.query(query, [
      req.body.pick_location,
      req.body.drop_location,
      req.body.pick_time,
      req.body.drop_time,
      req.body.response,
      req.body.customer_id,
      req.body.driver_id,
      req.params.id,
    ]);
    const [data] = result.rows;
    res.status(200).send({ done: true, body: data });
  } catch (err) {
    res.status(500).send({ done: false, message: "Something went wrong!" });
  }
};

//Delete orders(Admin)
const deleteOrders = async (req, res) => {
  try {
    const query = `DELETE FROM orders WHERE id = $1 RETURNING *`;
    const result = await pool.query(query, [req.params.id]);
    const [data] = result.rows;
    res.status(200).send({ done: true, body: data });
  } catch (err) {
    res.status(500).send({ done: false, message: "Something went wrong!" });
  }
};

const insertAvailability = async (req, res) => {
  try {
    const query = `UPDATE drivers SET available = $1 WHERE id = $2 RETURNING *`;
    const result = await pool.query(query, [
      req.params.available,
      req.params.id,
    ]);
    const [data] = result.rows;
    res.status(200).send({ done: true, body: data });
  } catch (err) {
    res.status(500).send({ done: false, message: "Something went wrong!" });
  }
};

//Read available drivers(Admin)
const getAvailableDrivers = async (req, res) => {
  try {
    const query = `select * from drivers where available = true ;`;
    const result = await pool.query(query);
    const data = result.rows;
    res.status(200).send({ done: true, body: data });
  } catch (err) {
    res.status(500).send({ done: false, message: "Something went wrong!" });
  }
};

//Read orders by response
const viewOrdersByResponse = async (req, res) => {
  try {
    const query = `SELECT *, (SELECT full_name FROM customers WHERE id = customer_id) AS customer_name,
                             (SELECT full_name FROM drivers WHERE id = driver_id) AS driver_name 
                              FROM orders WHERE response = $1 `;
    const result = await pool.query(query, [req.params.response]);
    const data = result.rows;
    res.status(200).send({ done: true, body: data });
  } catch (err) {
    res.status(500).send({ done: false, message: "Something went wrong!" });
  }
};

//Driver update response by order id
const insertResponse = async (req, res) => {
  try {
    const query = `UPDATE orders SET response = $1 WHERE id = $2 RETURNING *`;
    const result = await pool.query(query, [
      req.params.response,
      req.params.id,
    ]);
    const [data] = result.rows;
    res.status(200).send({ done: true, body: data });
  } catch (err) {
    console.log(err);
    res.status(500).send({ done: false, message: "Something went wrong!" });
  }
};

//Search orders(Admin)
const searchOrders = async (req, res) => {
  try {
    const { name } = req.query;
    const result = await pool.query(
      `SELECT *, (SELECT full_name FROM customers WHERE id = customer_id) AS customer_name,
                                                (SELECT full_name FROM drivers WHERE id = driver_id) AS driver_name   
                                                From orders WHERE pick_location || drop_location || pick_time || ' ' ILIKE $1 ORDER BY created DESC;`,
      [`%${name}%`]
    );
    res.status(200).send({ done: true, body: result.rows });
  } catch (err) {
    res.status(500).send({ done: false, message: "Something went wrong!" });
  }
};

//****************************************************************************************************
//Customer

//Create trips(Customer)
const customerCreateOrders = async (req, res) => {
  try {
    const {
      pick_location,
      drop_location,
      pick_time,
      drop_time,
      response,
      driver_id,
    } = req.body;
    const { id } = req.params;
    const query = `INSERT INTO orders(pick_location, drop_location, pick_time, drop_time, response, id, driver_id) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`;
    const result = await pool.query(query, [
      pick_location,
      drop_location,
      pick_time,
      drop_time,
      response,
      id,
      driver_id,
    ]);
    const [data] = result.rows;
    res.status(200).send({ done: true, body: data });
  } catch (err) {
    res
      .status(500)
      .send({ done: false, message: "Something went wrong ravindu!" });
  }
};

//Get trips(Customer)
const customerGetOrders = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `SELECT * FROM orders WHERE customer_id = $1`;
    const result = await pool.query(query, [id]);
    const data = result.rows;
    res.status(200).send({ done: true, body: data });
  } catch (err) {
    res
      .status(500)
      .send({ done: false, message: "Something went wrong ravindu!" });
  }
};

//Update trips(Customer)
const customerUpdateOrders = async (req, res) => {
  try {
    const query = `UPDATE orders SET pick_location = $1, drop_location = $2, pick_time = $3, drop_time = $4 WHERE id = $5 RETURNING *`;
    const result = await pool.query(query, [
      req.body.pick_location,
      req.body.drop_location,
      req.body.pick_time,
      req.body.drop_time,
      req.params.id,
    ]);
    const [data] = result.rows;
    res.status(200).send({ done: true, body: data });
  } catch (err) {
    res
      .status(500)
      .send({ done: false, message: "Something went wrong ravindu!" });
  }
};

//Delete trips(Customer)
const customerDeleteOrders = async (req, res) => {
  try {
    const query = `DELETE FROM orders WHERE id = $1 RETURNING *`;
    const result = await pool.query(query, [req.params.id]);
    console.log(result);
    const [data] = result.rows;
    res.status(200).send({ done: true, body: data });
  } catch (err) {
    res
      .status(500)
      .send({ done: false, message: "Something went wrong ravindu!" });
  }
};

//****************************************************************************************************
//Driver

const driverGetOrders = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `SELECT * FROM orders WHERE driver_id = $1`;
    const result = await pool.query(query, [id]);
    const data = result.rows;
    res.status(200).send({ done: true, body: data });
  } catch (err) {
    res
      .status(500)
      .send({ done: false, message: "Something went wrong ravindu!" });
  }
};

module.exports = {
  createOrders,
  getOrders,
  getOneOrder,
  updateOrders,
  deleteOrders,
  getAvailableDrivers,
  viewOrdersByResponse,
  insertAvailability,
  insertResponse,
  customerCreateOrders,
  customerGetOrders,
  customerUpdateOrders,
  customerDeleteOrders,
  driverGetOrders,
  searchOrders,
};
